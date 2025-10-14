// File: src/main/java/com/CSSEProject/SmartWasteManagement/waste/repository/WasteBinRepository.java
package com.CSSEProject.SmartWasteManagement.waste.repository;

import com.CSSEProject.SmartWasteManagement.waste.entity.WasteBin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WasteBinRepository extends JpaRepository<WasteBin, Long> {
    // This custom method will let us find a bin by its unique ID, like "BIN#15889"
    Optional<WasteBin> findByBinId(String binId);
}