// File: src/main/java/com/CSSEProject/SmartWasteManagement/reporting/service/ReportingService.java
package com.CSSEProject.SmartWasteManagement.reporting.service;

import com.CSSEProject.SmartWasteManagement.dto.CollectionEventDto; // <<< ADD
import com.CSSEProject.SmartWasteManagement.dto.DashboardStatsDto;
import com.CSSEProject.SmartWasteManagement.waste.entity.CollectionEvent;
import com.CSSEProject.SmartWasteManagement.waste.repository.CollectionEventRepository;
import com.CSSEProject.SmartWasteManagement.waste.repository.WasteBinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors; // <<< ADD

@Service
public class ReportingService {

    @Autowired
    private CollectionEventRepository collectionEventRepository;

    @Autowired
    private WasteBinRepository wasteBinRepository;

    public DashboardStatsDto getDashboardStats() {
        // ... (existing code remains the same)
        List<CollectionEvent> allCollections = collectionEventRepository.findAll();
        double totalWeight = allCollections.stream().mapToDouble(CollectionEvent::getWeightInKg).sum();
        long collectionCount = allCollections.size();
        long binCount = wasteBinRepository.count();
        DashboardStatsDto stats = new DashboardStatsDto();
        stats.setTotalCollections(collectionCount);
        stats.setTotalWeightKg(totalWeight);
        stats.setTotalBins(binCount);
        return stats;
    }

    // <<< START: NEW METHOD >>>
    public List<CollectionEventDto> getCollectionEvents() {
        return collectionEventRepository.findAll().stream()
                .map(this::convertToDto) // Convert each event to a DTO
                .collect(Collectors.toList());
    }

    // Helper method to perform the conversion
    private CollectionEventDto convertToDto(CollectionEvent event) {
        CollectionEventDto dto = new CollectionEventDto();
        dto.setId(event.getId());
        dto.setCollectionTime(event.getCollectionTime());
        dto.setWeightInKg(event.getWeightInKg());
        dto.setBinId(event.getWasteBin().getBinId());
        dto.setResidentName(event.getWasteBin().getResident().getName());
        dto.setStaffName(event.getStaffMember().getName());
        return dto;
    }
    // <<< END: NEW METHOD >>>
}