// File: src/main/java/com/CSSEProject/SmartWasteManagement/reporting/controller/ReportingController.java
package com.CSSEProject.SmartWasteManagement.reporting.controller;

import com.CSSEProject.SmartWasteManagement.dto.CollectionEventDto;
import com.CSSEProject.SmartWasteManagement.dto.DashboardStatsDto;
import com.CSSEProject.SmartWasteManagement.reporting.service.ReportingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportingController {

    @Autowired
    private ReportingService reportingService;

    @GetMapping("/dashboard-stats")
    public ResponseEntity<DashboardStatsDto> getDashboardStats() {
        DashboardStatsDto stats = reportingService.getDashboardStats();
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/collection-events")
    public ResponseEntity<List<CollectionEventDto>> getCollectionEvents() {
        List<CollectionEventDto> events = reportingService.getCollectionEvents();
        return ResponseEntity.ok(events);
    }
}