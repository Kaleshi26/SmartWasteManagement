// File: src/main/java/com/CSSEProject/SmartWasteManagement/waste/service/WasteService.java
package com.CSSEProject.SmartWasteManagement.waste.service;

import com.CSSEProject.SmartWasteManagement.user.entity.User;
import com.CSSEProject.SmartWasteManagement.user.repository.UserRepository;
import com.CSSEProject.SmartWasteManagement.waste.entity.CollectionEvent;
import com.CSSEProject.SmartWasteManagement.waste.entity.WasteBin;
import com.CSSEProject.SmartWasteManagement.waste.repository.CollectionEventRepository;
import com.CSSEProject.SmartWasteManagement.waste.repository.WasteBinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class WasteService {

    @Autowired
    private WasteBinRepository wasteBinRepository;

    @Autowired
    private CollectionEventRepository collectionEventRepository;

    @Autowired
    private UserRepository userRepository; // We need this to find the staff member

    public CollectionEvent recordCollection(String binId, Long staffId, Double weight) {
        // Step 1: Find the waste bin using its unique ID (e.g., "BIN#15889")
        WasteBin bin = wasteBinRepository.findByBinId(binId)
                .orElseThrow(() -> new RuntimeException("Error: Waste bin not found with ID: " + binId));

        // Step 2: Find the staff member who is performing the collection
        User staff = userRepository.findById(staffId)
                .orElseThrow(() -> new RuntimeException("Error: Staff member not found with ID: " + staffId));

        // Step 3: Create a new collection event
        CollectionEvent newEvent = new CollectionEvent();
        newEvent.setWasteBin(bin);
        newEvent.setStaffMember(staff);
        newEvent.setWeightInKg(weight);
        newEvent.setCollectionTime(LocalDateTime.now()); // Record the current time

        // Step 4: Save the event to the database
        return collectionEventRepository.save(newEvent);
    }
}