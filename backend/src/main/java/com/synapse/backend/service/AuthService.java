package com.synapse.backend.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.synapse.backend.dto.user.AuthResponse;
import com.synapse.backend.dto.user.LogInDTO;
import com.synapse.backend.dto.user.RegUserDTO;
import com.synapse.backend.dto.user.UserDTO;
import com.synapse.backend.exceptions.excep.BadPasswordException;
import com.synapse.backend.exceptions.excep.EmailNotFoundException;
import com.synapse.backend.exceptions.excep.EmailYaRegistrado;
import com.synapse.backend.model.User;
import com.synapse.backend.repository.UserRepository;
import com.synapse.backend.security.JWTUtil;

@Service
public class AuthService {
    
    private final UserRepository userRep;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private final JWTUtil jwtUtil = new JWTUtil();

    public AuthService(UserRepository userRep){
        this.userRep = userRep;
    }

    public AuthResponse registrarUser(RegUserDTO registerUser){
        if(userRep.findByEmail(registerUser.getEmail()).isPresent()){
            throw new EmailYaRegistrado("Email ya registrado");
        }

        User user = new User();
        user.setEmail(registerUser.getEmail());
        user.setUserName(registerUser.getUserName());
        user.setPassword(passwordEncoder.encode(registerUser.getPassword()));
        user.setRol("USER");

        userRep.save(user);

        
        String tok = jwtUtil.generateToken(user.getEmail());

        return new AuthResponse(tok, new UserDTO(user.getId(), user.getUserName(), user.getEmail()));
    }

    public AuthResponse logIn(LogInDTO logUser){
        User user = userRep.findByEmail(logUser.getEmail())
                    .orElseThrow(() -> new EmailNotFoundException("El email no esta registrado"));

        if(!passwordEncoder.matches(logUser.getPassword(), user.getPassword())){
            throw new BadPasswordException("Contraseña incorrecta");
        }

        String tok = jwtUtil.generateToken(user.getEmail());

        return new AuthResponse(tok, new UserDTO(user.getId(), user.getUserName(), user.getEmail()));
    }
}
