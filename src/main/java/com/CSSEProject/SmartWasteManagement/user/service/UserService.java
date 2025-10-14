// File: src/main/java/com/CSSEProject/SmartWasteManagement/user/service/UserService.java
package com.CSSEProject.SmartWasteManagement.user.service;

import com.CSSEProject.SmartWasteManagement.dto.RegisterRequestDto;
import com.CSSEProject.SmartWasteManagement.user.entity.User;
import com.CSSEProject.SmartWasteManagement.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service // Tells Spring that this is a service class
public class UserService {

    // Spring will automatically provide us with an instance of UserRepository
    @Autowired
    private UserRepository userRepository;

    public User registerUser(RegisterRequestDto registerRequestDto) {
        // Step 1: Check if a user with this email already exists
        if (userRepository.findByEmail(registerRequestDto.getEmail()).isPresent()) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        // Step 2: Create a new User entity from the request data
        User newUser = new User();
        newUser.setName(registerRequestDto.getName());
        newUser.setEmail(registerRequestDto.getEmail());

        // TODO: We must hash the password before saving! For now, we'll save it as-is.
        newUser.setPassword(registerRequestDto.getPassword());

        newUser.setAddress(registerRequestDto.getAddress());
        newUser.setRole(registerRequestDto.getRole());

        // Step 3: Save the new user to the database
        return userRepository.save(newUser);
    }
}