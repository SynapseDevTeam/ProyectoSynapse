package com.synapse.backend.config;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.synapse.backend.model.User;
import com.synapse.backend.repository.UserRepository;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;
    private final UserRepository userRep;

    public JWTFilter(JWTUtil jwtUtil, UserRepository userRep) {
        this.jwtUtil = jwtUtil;
        this.userRep = userRep;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
                                    throws ServletException, IOException {

        String path = request.getRequestURI();
        System.out.println("Request path: " + request.getRequestURI());
                               
        // Saltamos login y register
        if (path.startsWith("/auth/")) {
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            try {
                String token = authHeader.substring(7);
                String subject = jwtUtil.extractSubject(token);

                if (subject != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    User user = userRep.findByEmail(subject).orElse(null);
                    if (user != null && jwtUtil.validateToken(token, subject)) {
                        List<SimpleGrantedAuthority> authorities =
                        List.of(new SimpleGrantedAuthority("ROLE_" + user.getRol()));

                        UsernamePasswordAuthenticationToken authToken =
                                new UsernamePasswordAuthenticationToken(
                                        user, null, authorities);
                        SecurityContextHolder.getContext().setAuthentication(authToken);
                    }
                }
            } catch (Exception e) {
                // JWT inválido: no hacemos nada, simplemente no autenticamos
                System.out.println("JWT inválido o ausente: " + e.getMessage());
            }
        }

        filterChain.doFilter(request, response);
    }
}