// File: src/main/java/com/CSSEProject/SmartWasteManagement/reporting/controller/ReportingController.java
package com.CSSEProject.SmartWasteManagement.reporting.controller;

import com.CSSEProject.SmartWasteManagement.dto.CollectionEventDto;
import com.CSSEProject.SmartWasteManagement.dto.DashboardStatsDto;
import com.CSSEProject.SmartWasteManagement.dto.MonthlyWasteDto;
import com.CSSEProject.SmartWasteManagement.reporting.service.ReportingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportingController {

    @Autowired
    private ReportingService reportingService;

    @GetMapping("/dashboard-stats")
    public ResponseEntity<DashboardStatsDto> getDashboardStats(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return ResponseEntity.ok(reportingService.getDashboardStats(start, end));
    }

    @GetMapping("/collection-events")
    public ResponseEntity<List<CollectionEventDto>> getCollectionEvents(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return ResponseEntity.ok(reportingService.getCollectionEvents(start, end));
    }

    @GetMapping("/monthly-waste")
    public ResponseEntity<List<MonthlyWasteDto>> getMonthlyWaste() {
        return ResponseEntity.ok(reportingService.getMonthlyWasteData());
    }
}