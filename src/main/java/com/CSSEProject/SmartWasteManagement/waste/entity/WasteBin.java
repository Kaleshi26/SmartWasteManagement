// File: src/main/java/com/CSSEProject/SmartWasteManagement/waste/entity/WasteBin.java
package com.CSSEProject.SmartWasteManagement.waste.entity;

import com.CSSEProject.SmartWasteManagement.user.entity.User;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "waste_bins")
@Data
public class WasteBin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String binId; // e.g., "BIN#15889"

    private String address;

    // A bin belongs to one user (resident)
    @ManyToOne
    @JoinColumn(name = "resident_id")
    private User resident;
}