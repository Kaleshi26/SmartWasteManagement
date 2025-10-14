// File: src/main/java/com/CSSEProject/SmartWasteManagement/user/controller/UserController.java
package com.CSSEProject.SmartWasteManagement.user.controller;

import com.CSSEProject.SmartWasteManagement.dto.LoginRequestDto; // <<< ADD THIS IMPORT
import com.CSSEProject.SmartWasteManagement.dto.RegisterRequestDto;
import com.CSSEProject.SmartWasteManagement.user.entity.User;
import com.CSSEProject.SmartWasteManagement.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
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
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // This endpoint is accessible at http://localhost:8080/api/auth/users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // <<< START: NEW LOGIN ENDPOINT >>>
    /**
     * Handles POST requests for user login.
     * Accessible at http://localhost:8080/api/auth/login
     * @param loginRequestDto The request body containing email and password.
     * @return A response entity with the user data on success, or an error message on failure.
     */
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequestDto loginRequestDto) {
        try {
            User user = userService.loginUser(loginRequestDto);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    // <<< END: NEW LOGIN ENDPOINT >>>
}