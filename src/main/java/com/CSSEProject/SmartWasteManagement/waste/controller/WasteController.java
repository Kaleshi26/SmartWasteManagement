// File: src/main/java/com/CSSEProject/SmartWasteManagement/waste/controller/WasteController.java
package com.CSSEProject.SmartWasteManagement.waste.controller;

import com.CSSEProject.SmartWasteManagement.dto.BinDetailsDto; // <<< ADD
import com.CSSEProject.SmartWasteManagement.dto.CollectionRequestDto;
import com.CSSEProject.SmartWasteManagement.waste.entity.CollectionEvent;
import com.CSSEProject.SmartWasteManagement.waste.service.WasteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*; // <<< UPDATE

@RestController
@RequestMapping("/api/waste")
public class WasteController {

    @Autowired
    private WasteService wasteService;

    // <<< START: NEW ENDPOINT >>>
    // e.g., GET http://localhost:8080/api/waste/bin/BIN-101-OG47
    @GetMapping("/bin/{binId}")
    public ResponseEntity<?> getBinDetails(@PathVariable String binId) {
        try {
            BinDetailsDto details = wasteService.getBinDetails(binId);
            return ResponseEntity.ok(details);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    // <<< END: NEW ENDPOINT >>>

    @PostMapping("/collect")
    public ResponseEntity<?> recordCollectionEvent(@RequestBody CollectionRequestDto requestDto) {
        // This existing endpoint remains unchanged
        try {
            CollectionEvent event = wasteService.recordCollection(
                    requestDto.getBinId(),
                    requestDto.getStaffId(),
                    requestDto.getWeightInKg()
            );
            return ResponseEntity.ok(event);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}