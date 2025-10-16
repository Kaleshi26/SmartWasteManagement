// File: src/main/java/com/CSSEProject/SmartWasteManagement/waste/service/WasteService.java
package com.CSSEProject.SmartWasteManagement.waste.service;

import com.CSSEProject.SmartWasteManagement.dto.BinDetailsDto; // <<< ADD
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

    @Autowired private WasteBinRepository wasteBinRepository;
    @Autowired private CollectionEventRepository collectionEventRepository;
    @Autowired private UserRepository userRepository;

    // <<< START: NEW METHOD >>>
    public BinDetailsDto getBinDetails(String binId) {
        // Find the waste bin by its unique ID or throw an error
        WasteBin bin = wasteBinRepository.findByBinId(binId)
                .orElseThrow(() -> new RuntimeException("Bin not recognized. Please try again or enter manually."));

        // Create and populate the DTO with the necessary details
        BinDetailsDto details = new BinDetailsDto();
        details.setBinId(bin.getBinId());
        details.setAddress(bin.getAddress());
        details.setResidentName(bin.getResident().getName());
        return details;
    }
    // <<< END: NEW METHOD >>>

    public CollectionEvent recordCollection(String binId, Long staffId, Double weight) {
        // This existing method remains unchanged
        WasteBin bin = wasteBinRepository.findByBinId(binId)
                .orElseThrow(() -> new RuntimeException("Error: Waste bin not found with ID: " + binId));
        User staff = userRepository.findById(staffId)
                .orElseThrow(() -> new RuntimeException("Error: Staff member not found with ID: " + staffId));
        CollectionEvent newEvent = new CollectionEvent();
        newEvent.setWasteBin(bin);
        newEvent.setStaffMember(staff);
        newEvent.setWeightInKg(weight);
        newEvent.setCollectionTime(LocalDateTime.now());
        return collectionEventRepository.save(newEvent);
    }
}