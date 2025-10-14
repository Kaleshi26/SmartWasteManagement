// File: src/main/java/com/CSSEProject/SmartWasteManagement/user/entity/User.java
package com.CSSEProject.SmartWasteManagement.user.entity;

import jakarta.persistence.*;
import lombok.Data; // For getters, setters, etc.

@Entity
@Table(name = "users") // This tells JPA to create a table named "users"
@Data // Lombok annotation to automatically generate getters, setters, toString, etc.
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incrementing ID
    private Long id;

    private String name;

    @Column(unique = true) // Each email must be unique
    private String email;

    private String password;

    private String address;

    @Enumerated(EnumType.STRING) // Stores the enum as a string (e.g., "ROLE_RESIDENT")
    private UserRole role;
}