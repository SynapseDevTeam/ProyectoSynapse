package com.synapse.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.synapse.backend.dto.user.UserDTO;
import com.synapse.backend.model.User;
import com.synapse.backend.repository.UserRepository;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "${frontend.url}")
public class UsersController {

    private final UserRepository userRep;

    public UsersController(UserRepository userRep){
        this.userRep = userRep;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserDTO> getAllUsers() {
        return userRep.findAll().stream()
                .map(u -> new UserDTO(u.getId(), u.getUserName(), u.getEmail()))
                .toList();
    }

    @GetMapping("/me")
    public UserDTO getMe() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return new UserDTO(user.getId(), user.getUserName(), user.getEmail());
    }
}
