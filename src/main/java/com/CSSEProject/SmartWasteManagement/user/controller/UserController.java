// File: src/main/java/com/CSSEProject/SmartWasteManagement/user/controller/UserController.java
package com.CSSEProject.SmartWasteManagement.user.controller;

import com.CSSEProject.SmartWasteManagement.dto.RegisterRequestDto;
import com.CSSEProject.SmartWasteManagement.user.entity.User;
import com.CSSEProject.SmartWasteManagement.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping; // <<< ADD THIS IMPORT
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List; // <<< ADD THIS IMPORT

@RestController // Marks this class as a REST controller
@RequestMapping("/api/auth") // All endpoints in this class will start with /api/auth
public class UserController {

    @Autowired
    private UserService userService;

    // This method will handle POST requests to /api/auth/register
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequestDto registerRequestDto) {
        try {
            User registeredUser = userService.registerUser(registerRequestDto);
            return ResponseEntity.ok(registeredUser);
        } catch (RuntimeException e) {
            // This will catch the "Email is already in use!" error
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // <<< START: NEW METHOD >>>
    /**
     * Handles GET requests to retrieve all users.
     * This endpoint is accessible at http://localhost:8080/api/auth/users
     * @return A list of all users in the database.
     */
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    // <<< END: NEW METHOD >>>
}