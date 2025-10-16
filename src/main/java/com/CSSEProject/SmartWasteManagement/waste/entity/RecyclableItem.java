package com.CSSEProject.SmartWasteManagement.waste.entity;

import com.CSSEProject.SmartWasteManagement.payment.entity.Invoice;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "recyclable_items")
@Data
public class RecyclableItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private Long itemId;

    @ManyToOne
    @JoinColumn(name = "invoice_id", nullable = false)
    private Invoice invoice;

    @Column(nullable = false)
    private String type; // e.g., "Plastic", "Glass", "Metal", "Paper"

    @Column(nullable = false)
    private Double weight; // Weight in kg

    @Column(name = "refund_amount", nullable = false)
    private Double refundAmount; // Refund amount in currency
}
