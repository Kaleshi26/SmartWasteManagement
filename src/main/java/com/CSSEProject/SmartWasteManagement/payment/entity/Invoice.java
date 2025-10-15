// File: src/main/java/com/CSSEProject/SmartWasteManagement/payment/entity/Invoice.java
package com.CSSEProject.SmartWasteManagement.payment.entity;

import com.CSSEProject.SmartWasteManagement.user.entity.User;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "invoices")
@Data
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // An invoice belongs to one resident
    @ManyToOne
    @JoinColumn(name = "resident_id", nullable = false)
    private User resident;

    private LocalDate invoiceDate;
    private LocalDate dueDate;
    private Double amount;

    @Enumerated(EnumType.STRING)
    private InvoiceStatus status;
}