package com.CSSEProject.SmartWasteManagement.config;

import com.CSSEProject.SmartWasteManagement.payment.entity.Invoice;
import com.CSSEProject.SmartWasteManagement.payment.entity.InvoiceStatus;
import com.CSSEProject.SmartWasteManagement.payment.repository.InvoiceRepository;
import com.CSSEProject.SmartWasteManagement.user.entity.User;
import com.CSSEProject.SmartWasteManagement.user.entity.UserRole;
import com.CSSEProject.SmartWasteManagement.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Override
    public void run(String... args) throws Exception {
        // Create a sample resident user if it doesn't exist
        if (userRepository.count() == 0) {
            User resident = new User();
            resident.setName("John Doe");
            resident.setEmail("john.doe@example.com");
            resident.setPassword("password123");
            resident.setAddress("123 Main St, City, State");
            resident.setRole(UserRole.ROLE_RESIDENT);
            userRepository.save(resident);

            // Create sample invoices
            createSampleInvoices(resident);
        }
    }

    private void createSampleInvoices(User resident) {
        // Sample invoice 1
        Invoice invoice1 = new Invoice();
        invoice1.setResident(resident);
        invoice1.setInvoiceId("INV-001");
        invoice1.setInvoiceDate(LocalDate.now().minusDays(30));
        invoice1.setDueDate(LocalDate.now().plusDays(15));
        invoice1.setWeight(12.5);
        invoice1.setWeightCharge(2.04);
        invoice1.setAmount(25.50);
        invoice1.setStatus(InvoiceStatus.UNPAID);
        invoiceRepository.save(invoice1);

        // Sample invoice 2
        Invoice invoice2 = new Invoice();
        invoice2.setResident(resident);
        invoice2.setInvoiceId("INV-002");
        invoice2.setInvoiceDate(LocalDate.now().minusDays(25));
        invoice2.setDueDate(LocalDate.now().plusDays(20));
        invoice2.setWeight(9.2);
        invoice2.setWeightCharge(2.04);
        invoice2.setAmount(18.75);
        invoice2.setStatus(InvoiceStatus.UNPAID);
        invoiceRepository.save(invoice2);

        // Sample invoice 3
        Invoice invoice3 = new Invoice();
        invoice3.setResident(resident);
        invoice3.setInvoiceId("INV-003");
        invoice3.setInvoiceDate(LocalDate.now().minusDays(20));
        invoice3.setDueDate(LocalDate.now().plusDays(25));
        invoice3.setWeight(15.7);
        invoice3.setWeightCharge(2.04);
        invoice3.setAmount(32.00);
        invoice3.setStatus(InvoiceStatus.PAID);
        invoiceRepository.save(invoice3);

        // Sample invoice 4
        Invoice invoice4 = new Invoice();
        invoice4.setResident(resident);
        invoice4.setInvoiceId("INV-004");
        invoice4.setInvoiceDate(LocalDate.now().minusDays(15));
        invoice4.setDueDate(LocalDate.now().plusDays(30));
        invoice4.setWeight(7.5);
        invoice4.setWeightCharge(2.04);
        invoice4.setAmount(15.25);
        invoice4.setStatus(InvoiceStatus.UNPAID);
        invoiceRepository.save(invoice4);

        // Sample invoice 5
        Invoice invoice5 = new Invoice();
        invoice5.setResident(resident);
        invoice5.setInvoiceId("INV-005");
        invoice5.setInvoiceDate(LocalDate.now().minusDays(10));
        invoice5.setDueDate(LocalDate.now().minusDays(5));
        invoice5.setWeight(14.2);
        invoice5.setWeightCharge(2.04);
        invoice5.setAmount(28.90);
        invoice5.setStatus(InvoiceStatus.UNPAID);
        invoiceRepository.save(invoice5);
    }
}
