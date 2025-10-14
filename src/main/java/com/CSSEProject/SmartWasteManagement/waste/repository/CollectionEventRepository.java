// File: src/main/java/com/CSSEProject/SmartWasteManagement/waste/repository/CollectionEventRepository.java
package com.CSSEProject.SmartWasteManagement.waste.repository;

import com.CSSEProject.SmartWasteManagement.waste.entity.CollectionEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CollectionEventRepository extends JpaRepository<CollectionEvent, Long> {
    // We don't need any custom methods here for now. JpaRepository gives us everything we need.
}