// File: src/main/java/com/CSSEProject/SmartWasteManagement/controller/TestController.java
package com.CSSEProject.SmartWasteManagement.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController // Tells Spring this class will handle web requests
@RequestMapping("/api") // All endpoints in this class will start with /api
public class TestController {

    @GetMapping("/hello") // This creates a URL at http://localhost:8080/api/hello
    public String sayHello() {
        return "Hello, Smart Waste Management Team! The API is working!";
    }
}