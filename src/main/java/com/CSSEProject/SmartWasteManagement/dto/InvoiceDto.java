package com.CSSEProject.SmartWasteManagement.dto;

import com.CSSEProject.SmartWasteManagement.payment.entity.InvoiceStatus;
import lombok.Data;

import java.time.LocalDate;

@Data
public class InvoiceDto {
    private Long id;
    private String invoiceId;
    private LocalDate invoiceDate;
    private LocalDate dueDate;
    private Double weight;
    private Double weightCharge;
    private Double amount;
    private InvoiceStatus status;
    private Long residentId;
    private String residentName;
    private String residentEmail;
}
