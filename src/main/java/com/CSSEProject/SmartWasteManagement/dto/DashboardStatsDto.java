// File: src/main/java/com/CSSEProject/SmartWasteManagement/dto/DashboardStatsDto.java
package com.CSSEProject.SmartWasteManagement.dto;

import lombok.Data;

@Data
public class DashboardStatsDto {
    private long totalCollections;
    private double totalWeightKg;
    private long totalBins;
}