// File: src/main/java/com/CSSEProject/SmartWasteManagement/waste/controller/WasteController.java
package com.CSSEProject.SmartWasteManagement.waste.controller;

import com.CSSEProject.SmartWasteManagement.dto.CollectionRequestDto;
import com.CSSEProject.SmartWasteManagement.waste.entity.CollectionEvent;
import com.CSSEProject.SmartWasteManagement.waste.service.WasteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/waste") // All endpoints here will start with /api/waste
public class WasteController {

    @Autowired
    private WasteService wasteService;

    @PostMapping("/collect")
    public ResponseEntity<?> recordCollectionEvent(@RequestBody CollectionRequestDto requestDto) {
        try {
            CollectionEvent event = wasteService.recordCollection(
                    requestDto.getBinId(),
                    requestDto.getStaffId(),
                    requestDto.getWeightInKg()
            );
            return ResponseEntity.ok(event);
        } catch (RuntimeException e) {
            // This will catch errors like "Bin not found" or "Staff not found"
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}