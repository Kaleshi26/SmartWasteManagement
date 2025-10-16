package com.CSSEProject.SmartWasteManagement.waste.repository;

import com.CSSEProject.SmartWasteManagement.waste.entity.RecyclableItem;
import com.CSSEProject.SmartWasteManagement.payment.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecyclableItemRepository extends JpaRepository<RecyclableItem, Long> {
    
    // Find all recyclable items for a specific invoice
    List<RecyclableItem> findByInvoice(Invoice invoice);
    
    // Find all recyclable items by invoice ID
    List<RecyclableItem> findByInvoiceId(Long invoiceId);
    
    // Find all recyclable items by type
    List<RecyclableItem> findByType(String type);
    
    // Find recyclable items by type and invoice
    List<RecyclableItem> findByTypeAndInvoice(String type, Invoice invoice);
    
    // Custom query to get total refund amount for an invoice
    @Query("SELECT SUM(r.refundAmount) FROM RecyclableItem r WHERE r.invoice.id = :invoiceId")
    Double getTotalRefundAmountByInvoiceId(@Param("invoiceId") Long invoiceId);
    
    // Custom query to get total weight for an invoice
    @Query("SELECT SUM(r.weight) FROM RecyclableItem r WHERE r.invoice.id = :invoiceId")
    Double getTotalWeightByInvoiceId(@Param("invoiceId") Long invoiceId);
}
