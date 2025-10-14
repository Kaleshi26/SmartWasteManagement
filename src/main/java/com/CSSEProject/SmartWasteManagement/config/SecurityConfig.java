// File: src/main/java/com/CSSEProject/SmartWasteManagement/config/SecurityConfig.java
package com.CSSEProject.SmartWasteManagement.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration // Marks this as a configuration class
@EnableWebSecurity // Enables Spring's web security support
public class SecurityConfig {

    @Bean // This makes the PasswordEncoder available to the whole application
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF for APIs
                .authorizeHttpRequests(auth -> auth
                        // Allow anyone to access the registration and login endpoints
                        .requestMatchers("/api/auth/**").permitAll()
                        // For now, allow other requests. We will secure them later.
                        .anyRequest().permitAll()
                );
        return http.build();
    }
}