// File: src/main/java/com/CSSEProject/SmartWasteManagement/reporting/service/ReportingService.java
package com.CSSEProject.SmartWasteManagement.reporting.service;

import com.CSSEProject.SmartWasteManagement.dto.DashboardStatsDto;
import com.CSSEProject.SmartWasteManagement.waste.entity.CollectionEvent;
import com.CSSEProject.SmartWasteManagement.waste.repository.CollectionEventRepository;
import com.CSSEProject.SmartWasteManagement.waste.repository.WasteBinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportingService {

    @Autowired
    private CollectionEventRepository collectionEventRepository;

    @Autowired
    private WasteBinRepository wasteBinRepository;

    public DashboardStatsDto getDashboardStats() {
        List<CollectionEvent> allCollections = collectionEventRepository.findAll();

        // Calculate the total weight by summing up the weight of each collection
        double totalWeight = allCollections.stream()
                .mapToDouble(CollectionEvent::getWeightInKg)
                .sum();

        // Get other stats
        long collectionCount = allCollections.size();
        long binCount = wasteBinRepository.count();

        // Create the DTO to send back to the frontend
        DashboardStatsDto stats = new DashboardStatsDto();
        stats.setTotalCollections(collectionCount);
        stats.setTotalWeightKg(totalWeight);
        stats.setTotalBins(binCount);

        return stats;
    }
}