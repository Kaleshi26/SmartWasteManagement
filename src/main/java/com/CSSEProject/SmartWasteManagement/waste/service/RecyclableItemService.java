package com.CSSEProject.SmartWasteManagement.waste.service;

import com.CSSEProject.SmartWasteManagement.dto.RecyclableItemDto;
import com.CSSEProject.SmartWasteManagement.payment.entity.Invoice;
import com.CSSEProject.SmartWasteManagement.payment.repository.InvoiceRepository;
import com.CSSEProject.SmartWasteManagement.waste.entity.RecyclableItem;
import com.CSSEProject.SmartWasteManagement.waste.repository.RecyclableItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RecyclableItemService {

    @Autowired
    private RecyclableItemRepository recyclableItemRepository;
    
    @Autowired
    private InvoiceRepository invoiceRepository;

    // Create a new recyclable item
    public RecyclableItemDto createRecyclableItem(RecyclableItemDto recyclableItemDto) {
        Invoice invoice = invoiceRepository.findById(recyclableItemDto.getInvoiceId())
                .orElseThrow(() -> new RuntimeException("Invoice not found with ID: " + recyclableItemDto.getInvoiceId()));

        RecyclableItem recyclableItem = new RecyclableItem();
        recyclableItem.setInvoice(invoice);
        recyclableItem.setType(recyclableItemDto.getType());
        recyclableItem.setWeight(recyclableItemDto.getWeight());
        recyclableItem.setRefundAmount(recyclableItemDto.getRefundAmount());

        RecyclableItem savedItem = recyclableItemRepository.save(recyclableItem);
        return convertToDto(savedItem);
    }

    // Get all recyclable items
    public List<RecyclableItemDto> getAllRecyclableItems() {
        return recyclableItemRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Get recyclable item by ID
    public RecyclableItemDto getRecyclableItemById(Long itemId) {
        RecyclableItem item = recyclableItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Recyclable item not found with ID: " + itemId));
        return convertToDto(item);
    }

    // Get all recyclable items for a specific invoice
    public List<RecyclableItemDto> getRecyclableItemsByInvoiceId(Long invoiceId) {
        return recyclableItemRepository.findByInvoiceId(invoiceId)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Get all recyclable items by type
    public List<RecyclableItemDto> getRecyclableItemsByType(String type) {
        return recyclableItemRepository.findByType(type)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Update recyclable item
    public RecyclableItemDto updateRecyclableItem(Long itemId, RecyclableItemDto recyclableItemDto) {
        RecyclableItem existingItem = recyclableItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Recyclable item not found with ID: " + itemId));

        Invoice invoice = invoiceRepository.findById(recyclableItemDto.getInvoiceId())
                .orElseThrow(() -> new RuntimeException("Invoice not found with ID: " + recyclableItemDto.getInvoiceId()));

        existingItem.setInvoice(invoice);
        existingItem.setType(recyclableItemDto.getType());
        existingItem.setWeight(recyclableItemDto.getWeight());
        existingItem.setRefundAmount(recyclableItemDto.getRefundAmount());

        RecyclableItem updatedItem = recyclableItemRepository.save(existingItem);
        return convertToDto(updatedItem);
    }

    // Delete recyclable item
    public void deleteRecyclableItem(Long itemId) {
        if (!recyclableItemRepository.existsById(itemId)) {
            throw new RuntimeException("Recyclable item not found with ID: " + itemId);
        }
        recyclableItemRepository.deleteById(itemId);
    }

    // Get total refund amount for an invoice
    public Double getTotalRefundAmountByInvoiceId(Long invoiceId) {
        Double total = recyclableItemRepository.getTotalRefundAmountByInvoiceId(invoiceId);
        return total != null ? total : 0.0;
    }

    // Get total weight for an invoice
    public Double getTotalWeightByInvoiceId(Long invoiceId) {
        Double total = recyclableItemRepository.getTotalWeightByInvoiceId(invoiceId);
        return total != null ? total : 0.0;
    }

    // Helper method to convert entity to DTO
    private RecyclableItemDto convertToDto(RecyclableItem recyclableItem) {
        RecyclableItemDto dto = new RecyclableItemDto();
        dto.setItemId(recyclableItem.getItemId());
        dto.setInvoiceId(recyclableItem.getInvoice().getId());
        dto.setType(recyclableItem.getType());
        dto.setWeight(recyclableItem.getWeight());
        dto.setRefundAmount(recyclableItem.getRefundAmount());
        return dto;
    }
}
