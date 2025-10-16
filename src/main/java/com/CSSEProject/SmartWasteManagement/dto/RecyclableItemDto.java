package com.CSSEProject.SmartWasteManagement.dto;

import lombok.Data;

@Data
public class RecyclableItemDto {
    private Long itemId;
    private Long invoiceId;
    private String type;
    private Double weight;
    private Double refundAmount;
}
