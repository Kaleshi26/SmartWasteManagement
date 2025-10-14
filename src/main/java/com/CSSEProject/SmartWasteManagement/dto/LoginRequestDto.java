// File: src/main/java/com/CSSEProject/SmartWasteManagement/dto/LoginRequestDto.java
package com.CSSEProject.SmartWasteManagement.dto;

import lombok.Data;

@Data
public class LoginRequestDto {
    private String email;
    private String password;
}