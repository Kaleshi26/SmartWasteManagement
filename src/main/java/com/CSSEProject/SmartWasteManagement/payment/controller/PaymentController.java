// File: src/main/java/com/CSSEProject/SmartWasteManagement/payment/controller/PaymentController.java
package com.CSSEProject.SmartWasteManagement.payment.controller;

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
    public ResponseEntity<List<Invoice>> getUserInvoices(@PathVariable Long userId) {
        List<Invoice> invoices = paymentService.getInvoicesForUser(userId);
        return ResponseEntity.ok(invoices);
    }

    // Endpoint to simulate paying an invoice
    // e.g., POST http://localhost:8080/api/invoices/pay/101
    @PostMapping("/pay/{invoiceId}")
    public ResponseEntity<?> payInvoice(@PathVariable Long invoiceId) {
        try {
            Invoice paidInvoice = paymentService.payInvoice(invoiceId);
            return ResponseEntity.ok(paidInvoice);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}