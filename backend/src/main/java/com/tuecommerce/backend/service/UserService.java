package com.tuecommerce.backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tuecommerce.backend.model.Role;
import com.tuecommerce.backend.model.User;
import com.tuecommerce.backend.repository.UserRepository;

@Service
public class UserService { // O AuthService
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

   public User registerNewUser(String username, String password, String firstName, String lastName) {
    if (userRepository.existsByUsername(username)) {
        throw new RuntimeException("Username already exists");
    }

    User newUser = new User();
    newUser.setUsername(username);
    newUser.setPassword(passwordEncoder.encode(password));
    newUser.setFirstName(firstName);
    newUser.setLastName(lastName);

    // Asignar rol
    if (username.equalsIgnoreCase("Darkltata@gmail.com")) {
        newUser.setRole(Role.ADMIN);
    } else {
        newUser.setRole(Role.USER);
    }

    return userRepository.save(newUser);
}

    public User authenticate(String username, String password) {
        User user = userRepository.findByUsername(username)
                        .orElseThrow(() -> new RuntimeException("User not found"));
        if (passwordEncoder.matches(password, user.getPassword())) {
            return user;
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }
}

