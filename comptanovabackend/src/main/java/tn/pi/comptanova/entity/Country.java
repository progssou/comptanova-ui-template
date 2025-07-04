package tn.pi.comptanova.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "countries")
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(unique = true)
    private String code; // TN, FR

    @NotBlank
    private String name; // Tunisie, France

    @NotBlank
    private String currency; // TND, EUR

    private String accountingStandard; // PCG_TUNISIEN, PCG_FRANCAIS

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructeurs
    public Country() {}

    public Country(String code, String name, String currency, String accountingStandard) {
        this.code = code;
        this.name = name;
        this.currency = currency;
        this.accountingStandard = accountingStandard;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
}
