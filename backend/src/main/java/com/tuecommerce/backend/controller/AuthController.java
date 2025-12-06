package com.tuecommerce.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tuecommerce.backend.model.User;
import com.tuecommerce.backend.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Permite requests desde tu frontend React
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User newUser) {
    try {
        User registeredUser = userService.registerNewUser(
            newUser.getUsername(),
            newUser.getPassword(),
            newUser.getFirstName(),
            newUser.getLastName()
        );
        return new ResponseEntity<>("User registered successfully!", HttpStatus.CREATED);
    } catch (RuntimeException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
}

   @PostMapping("/login")
public ResponseEntity<?> loginUser(@RequestBody User loginUser) {
    try {
        User authenticatedUser = userService.authenticate(
            loginUser.getUsername(), 
            loginUser.getPassword());

        Map<String, Object> response = new HashMap<>();
        response.put("username", authenticatedUser.getUsername());
        response.put("firstName", authenticatedUser.getFirstName());
        response.put("lastName", authenticatedUser.getLastName());
        response.put("role", authenticatedUser.getRole().name());

        return new ResponseEntity<>(response, HttpStatus.OK);

    } catch (RuntimeException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
    }
}
}