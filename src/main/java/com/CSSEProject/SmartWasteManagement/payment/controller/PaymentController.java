// File: src/main/java/com/CSSEProject/SmartWasteManagement/payment/controller/PaymentController.java
package com.CSSEProject.SmartWasteManagement.payment.controller;

import com.CSSEProject.SmartWasteManagement.dto.InvoiceDto;
import com.CSSEProject.SmartWasteManagement.payment.entity.Invoice;
import com.CSSEProject.SmartWasteManagement.payment.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoices")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    // Endpoint to get invoices for a specific user
    // e.g., GET http://localhost:8080/api/invoices/user/1
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<InvoiceDto>> getUserInvoices(@PathVariable Long userId) {
        List<InvoiceDto> invoices = paymentService.getInvoicesForUserAsDto(userId);
        return ResponseEntity.ok(invoices);
    }

    // Endpoint to simulate paying an invoice
    // e.g., POST http://localhost:8080/api/invoices/pay/101
    @PostMapping("/pay/{invoiceId}")
    public ResponseEntity<?> payInvoice(@PathVariable Long invoiceId) {
        try {
            Invoice paidInvoice = paymentService.payInvoice(invoiceId);
            InvoiceDto invoiceDto = paymentService.convertToDto(paidInvoice);
            return ResponseEntity.ok(invoiceDto);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}