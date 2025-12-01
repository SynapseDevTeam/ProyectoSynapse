package com.synapse.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.synapse.backend.dto.user.RegUserDTO;
import com.synapse.backend.dto.user.AuthResponse;
import com.synapse.backend.dto.user.LogInDTO;
import com.synapse.backend.service.AuthService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "${frontend.url}")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping("/login")
    public AuthResponse logIn(@Valid @RequestBody LogInDTO logUser) {
        return authService.logIn(logUser);
    }
    

    @PostMapping("/register")
    public AuthResponse registrar(@Valid @RequestBody RegUserDTO registro) {
        return authService.registrarUser(registro);
    }
}