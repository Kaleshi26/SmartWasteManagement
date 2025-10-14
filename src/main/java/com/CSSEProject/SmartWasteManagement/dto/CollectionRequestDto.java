// File: src/main/java/com/CSSEProject/SmartWasteManagement/dto/CollectionRequestDto.java
package com.CSSEProject.SmartWasteManagement.dto;

import lombok.Data;

@Data
public class CollectionRequestDto {
    private String binId;      // The unique ID of the bin being collected (e.g., "BIN#15889")
    private Long staffId;      // The database ID of the staff member collecting the waste
    private Double weightInKg; // The weight of the collected waste
}