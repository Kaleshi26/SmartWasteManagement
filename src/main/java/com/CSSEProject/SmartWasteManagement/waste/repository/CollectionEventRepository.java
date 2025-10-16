// File: src/main/java/com/CSSEProject/SmartWasteManagement/waste/repository/CollectionEventRepository.java
package com.CSSEProject.SmartWasteManagement.waste.repository;

import com.CSSEProject.SmartWasteManagement.dto.MonthlyWasteDto;
import com.CSSEProject.SmartWasteManagement.waste.entity.CollectionEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query; // <<< ADD
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List; // <<< ADD

@Repository
public interface CollectionEventRepository extends JpaRepository<CollectionEvent, Long> {

    // <<< START: NEW QUERY >>>
    @Query(value = "SELECT new com.CSSEProject.SmartWasteManagement.dto.MonthlyWasteDto( " +
            "TO_CHAR(c.collectionTime, 'Mon'), " +
            "SUM(c.weightInKg)) " +
            "FROM CollectionEvent c " +
            "WHERE EXTRACT(YEAR FROM c.collectionTime) = EXTRACT(YEAR FROM CURRENT_DATE) " +
            "GROUP BY TO_CHAR(c.collectionTime, 'Mon'), EXTRACT(MONTH FROM c.collectionTime) " +
            "ORDER BY EXTRACT(MONTH FROM c.collectionTime)")
    List<MonthlyWasteDto> findMonthlyWasteTotalForCurrentYear();
    // <<< END: NEW QUERY >>>

    // This method finds all collection events between a start and end date
    List<CollectionEvent> findByCollectionTimeBetween(LocalDateTime start, LocalDateTime end);
}