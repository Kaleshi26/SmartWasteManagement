// File: src/main/java/com/CSSEProject/SmartWasteManagement/reporting/service/ReportingService.java
package com.CSSEProject.SmartWasteManagement.reporting.service;

import com.CSSEProject.SmartWasteManagement.dto.CollectionEventDto;
import com.CSSEProject.SmartWasteManagement.dto.DashboardStatsDto;
import com.CSSEProject.SmartWasteManagement.dto.MonthlyWasteDto;
import com.CSSEProject.SmartWasteManagement.waste.entity.CollectionEvent;
import com.CSSEProject.SmartWasteManagement.waste.repository.CollectionEventRepository;
import com.CSSEProject.SmartWasteManagement.waste.repository.WasteBinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportingService {

    @Autowired
    private CollectionEventRepository collectionEventRepository;

    @Autowired
    private WasteBinRepository wasteBinRepository;

    public DashboardStatsDto getDashboardStats(LocalDateTime start, LocalDateTime end) {
        List<CollectionEvent> collections;
        // If start and end dates are provided, filter by date range
        if (start != null && end != null) {
            collections = collectionEventRepository.findByCollectionTimeBetween(start, end);
        } else {
            // Otherwise, get all collections
            collections = collectionEventRepository.findAll();
        }

        double totalWeight = collections.stream().mapToDouble(CollectionEvent::getWeightInKg).sum();
        long collectionCount = collections.size();
        // Total bin count is independent of the date filter
        long binCount = wasteBinRepository.count();

        DashboardStatsDto stats = new DashboardStatsDto();
        stats.setTotalCollections(collectionCount);
        stats.setTotalWeightKg(totalWeight);
        stats.setTotalBins(binCount);
        return stats;
    }

    public List<CollectionEventDto> getCollectionEvents(LocalDateTime start, LocalDateTime end) {
        List<CollectionEvent> collections;
        if (start != null && end != null) {
            collections = collectionEventRepository.findByCollectionTimeBetween(start, end);
        } else {
            collections = collectionEventRepository.findAll();
        }
        return collections.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

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

    public List<MonthlyWasteDto> getMonthlyWasteData() {
        return collectionEventRepository.findMonthlyWasteTotalForCurrentYear();
    }
}