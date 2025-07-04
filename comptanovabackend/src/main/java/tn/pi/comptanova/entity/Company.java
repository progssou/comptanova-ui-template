package tn.pi.comptanova.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import tn.pi.comptanova.enums.AccountingType;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "companies")
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    private String address;
    private String phone;
    private String email;
    private String taxNumber;

    @ManyToOne
    @JoinColumn(name = "country_id")
    private Country country;

    @Enumerated(EnumType.STRING)
    private AccountingType accountingType;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private String siret;
    private String matriculeFiscal;
    private String industry;
    private String city;
    private String postalCode;

    // Constructeurs
    public Company() {}

    public Company(String name, Country country) {
        this.name = name;
        this.country = country;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }


}
