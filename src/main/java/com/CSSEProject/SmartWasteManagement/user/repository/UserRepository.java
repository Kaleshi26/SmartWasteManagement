// File: src/main/java/com/CSSEProject/SmartWasteManagement/user/repository/UserRepository.java
package com.CSSEProject.SmartWasteManagement.user.repository;

import com.CSSEProject.SmartWasteManagement.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Spring Data JPA automatically creates a method to find a user by their email
    Optional<User> findByEmail(String email);
}