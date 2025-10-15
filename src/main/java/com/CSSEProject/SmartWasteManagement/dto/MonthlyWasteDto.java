// File: src/main/java/com/CSSEProject/SmartWasteManagement/dto/MonthlyWasteDto.java
package com.CSSEProject.SmartWasteManagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonthlyWasteDto {
    private String month; // e.g., "Jan", "Feb"
    private Double totalWeight;
}