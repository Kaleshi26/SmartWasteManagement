// File: src/main/java/com/CSSEProject/SmartWasteManagement/user/service/UserService.java
package com.CSSEProject.SmartWasteManagement.user.service;

import com.CSSEProject.SmartWasteManagement.dto.LoginRequestDto; // <<< ADD THIS IMPORT
import com.CSSEProject.SmartWasteManagement.dto.RegisterRequestDto;
import com.CSSEProject.SmartWasteManagement.user.entity.User;
import com.CSSEProject.SmartWasteManagement.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(RegisterRequestDto registerRequestDto) {
        if (userRepository.findByEmail(registerRequestDto.getEmail()).isPresent()) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        User newUser = new User();
        newUser.setName(registerRequestDto.getName());
        newUser.setEmail(registerRequestDto.getEmail());
        newUser.setPassword(passwordEncoder.encode(registerRequestDto.getPassword()));
        newUser.setAddress(registerRequestDto.getAddress());
        newUser.setRole(registerRequestDto.getRole());

        return userRepository.save(newUser);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // <<< START: NEW LOGIN METHOD >>>
    /**
     * Authenticates a user based on email and password.
     * @param loginRequestDto DTO containing the user's email and password.
     * @return The authenticated User object if credentials are valid.
     * @throws RuntimeException if the user is not found or the password is invalid.
     */
    public User loginUser(LoginRequestDto loginRequestDto) {
        // Find the user by email or throw an error if not found
        User user = userRepository.findByEmail(loginRequestDto.getEmail())
                .orElseThrow(() -> new RuntimeException("Error: User not found with email: " + loginRequestDto.getEmail()));

        // Check if the provided plain text password matches the hashed password in the database
        if (passwordEncoder.matches(loginRequestDto.getPassword(), user.getPassword())) {
            return user; // Passwords match, login is successful
        } else {
            throw new RuntimeException("Error: Invalid password.");
        }
    }
    // <<< END: NEW LOGIN METHOD >>>
}