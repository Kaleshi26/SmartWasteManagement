// File: src/main/java/com/CSSEProject/SmartWasteManagement/dto/BinDetailsDto.java
package com.CSSEProject.SmartWasteManagement.dto;

import lombok.Data;

@Data
public class BinDetailsDto {
    private String binId;
    private String address;
    private String residentName;
    // You can add more fields here later, like 'binType' or 'frequency'
}