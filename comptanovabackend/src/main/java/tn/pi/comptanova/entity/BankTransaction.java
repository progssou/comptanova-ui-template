package tn.pi.comptanova.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class BankTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;
    private Double amount;
    private String date;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;
} 