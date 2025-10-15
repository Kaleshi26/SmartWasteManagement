// File: src/main/java/com/CSSEProject/SmartWasteManagement/dto/CollectionEventDto.java
package com.CSSEProject.SmartWasteManagement.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CollectionEventDto {
    private Long id;
    private String binId;
    private String residentName;
    private String staffName;
    private LocalDateTime collectionTime;
    private Double weightInKg;
}