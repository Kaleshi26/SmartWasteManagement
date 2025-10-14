// File: src/main/java/com/CSSEProject/SmartWasteManagement/dto/RegisterRequestDto.java
package com.CSSEProject.SmartWasteManagement.dto;

import com.CSSEProject.SmartWasteManagement.user.entity.UserRole;
import lombok.Data;

@Data // Lombok annotation for automatic getters, setters, etc.
public class RegisterRequestDto {

    private String name;
    private String email;
    private String password;
    private String address;
    private UserRole role; // Will be ROLE_RESIDENT, ROLE_STAFF, etc.
}