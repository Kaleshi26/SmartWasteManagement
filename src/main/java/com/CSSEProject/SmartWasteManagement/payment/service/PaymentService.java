// File: src/main/java/com/CSSEProject/SmartWasteManagement/payment/service/PaymentService.java
package com.CSSEProject.SmartWasteManagement.payment.service;

import com.CSSEProject.SmartWasteManagement.dto.InvoiceDto;
import com.CSSEProject.SmartWasteManagement.payment.entity.Invoice;
import com.CSSEProject.SmartWasteManagement.payment.entity.InvoiceStatus;
import com.CSSEProject.SmartWasteManagement.payment.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    public List<Invoice> getInvoicesForUser(Long userId) {
        return invoiceRepository.findByResidentId(userId);
    }

    public List<InvoiceDto> getInvoicesForUserAsDto(Long userId) {
        List<Invoice> invoices = invoiceRepository.findByResidentId(userId);
        return invoices.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public InvoiceDto convertToDto(Invoice invoice) {
        InvoiceDto dto = new InvoiceDto();
        dto.setId(invoice.getId());
        dto.setInvoiceId(invoice.getInvoiceId());
        dto.setInvoiceDate(invoice.getInvoiceDate());
        dto.setDueDate(invoice.getDueDate());
        dto.setWeight(invoice.getWeight());
        dto.setWeightCharge(invoice.getWeightCharge());
        dto.setAmount(invoice.getAmount());
        dto.setStatus(invoice.getStatus());
        dto.setResidentId(invoice.getResident().getId());
        dto.setResidentName(invoice.getResident().getName());
        dto.setResidentEmail(invoice.getResident().getEmail());
        return dto;
    }

    public Invoice payInvoice(Long invoiceId) {
        // Find the invoice or throw an error if it doesn't exist
        Invoice invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(() -> new RuntimeException("Invoice not found with ID: " + invoiceId));

        // Check if the invoice is already paid
        if (invoice.getStatus() == InvoiceStatus.PAID) {
            throw new RuntimeException("Invoice is already paid.");
        }

        // For this simulation, we'll just mark it as PAID.
        // A real system would have logic to connect to a payment gateway.
        invoice.setStatus(InvoiceStatus.PAID);

        // Save the updated invoice back to the database
        return invoiceRepository.save(invoice);
    }
}