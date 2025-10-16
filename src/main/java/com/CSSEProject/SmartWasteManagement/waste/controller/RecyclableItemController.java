package com.CSSEProject.SmartWasteManagement.waste.controller;

import com.CSSEProject.SmartWasteManagement.dto.RecyclableItemDto;
import com.CSSEProject.SmartWasteManagement.waste.service.RecyclableItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recyclable-items")
public class RecyclableItemController {

    @Autowired
    private RecyclableItemService recyclableItemService;

    // Create a new recyclable item
    @PostMapping
    public ResponseEntity<?> createRecyclableItem(@RequestBody RecyclableItemDto recyclableItemDto) {
        try {
            RecyclableItemDto createdItem = recyclableItemService.createRecyclableItem(recyclableItemDto);
            return ResponseEntity.ok(createdItem);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get all recyclable items
    @GetMapping
    public ResponseEntity<?> getAllRecyclableItems() {
        try {
            List<RecyclableItemDto> items = recyclableItemService.getAllRecyclableItems();
            return ResponseEntity.ok(items);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get recyclable item by ID
    @GetMapping("/{itemId}")
    public ResponseEntity<?> getRecyclableItemById(@PathVariable Long itemId) {
        try {
            RecyclableItemDto item = recyclableItemService.getRecyclableItemById(itemId);
            return ResponseEntity.ok(item);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get all recyclable items for a specific invoice
    @GetMapping("/invoice/{invoiceId}")
    public ResponseEntity<?> getRecyclableItemsByInvoiceId(@PathVariable Long invoiceId) {
        try {
            List<RecyclableItemDto> items = recyclableItemService.getRecyclableItemsByInvoiceId(invoiceId);
            return ResponseEntity.ok(items);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get all recyclable items by type
    @GetMapping("/type/{type}")
    public ResponseEntity<?> getRecyclableItemsByType(@PathVariable String type) {
        try {
            List<RecyclableItemDto> items = recyclableItemService.getRecyclableItemsByType(type);
            return ResponseEntity.ok(items);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Update recyclable item
    @PutMapping("/{itemId}")
    public ResponseEntity<?> updateRecyclableItem(@PathVariable Long itemId, @RequestBody RecyclableItemDto recyclableItemDto) {
        try {
            RecyclableItemDto updatedItem = recyclableItemService.updateRecyclableItem(itemId, recyclableItemDto);
            return ResponseEntity.ok(updatedItem);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Delete recyclable item
    @DeleteMapping("/{itemId}")
    public ResponseEntity<?> deleteRecyclableItem(@PathVariable Long itemId) {
        try {
            recyclableItemService.deleteRecyclableItem(itemId);
            return ResponseEntity.ok("Recyclable item deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get total refund amount for an invoice
    @GetMapping("/invoice/{invoiceId}/total-refund")
    public ResponseEntity<?> getTotalRefundAmountByInvoiceId(@PathVariable Long invoiceId) {
        try {
            Double totalRefund = recyclableItemService.getTotalRefundAmountByInvoiceId(invoiceId);
            return ResponseEntity.ok(totalRefund);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get total weight for an invoice
    @GetMapping("/invoice/{invoiceId}/total-weight")
    public ResponseEntity<?> getTotalWeightByInvoiceId(@PathVariable Long invoiceId) {
        try {
            Double totalWeight = recyclableItemService.getTotalWeightByInvoiceId(invoiceId);
            return ResponseEntity.ok(totalWeight);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
