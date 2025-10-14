// File: src/main/java/com/CSSEProject/SmartWasteManagement/waste/entity/CollectionEvent.java
package com.CSSEProject.SmartWasteManagement.waste.entity;

import com.CSSEProject.SmartWasteManagement.user.entity.User;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "collection_events")
@Data
public class CollectionEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "bin_id")
    private WasteBin wasteBin;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private User staffMember;

    private LocalDateTime collectionTime;

    private Double weightInKg;
}