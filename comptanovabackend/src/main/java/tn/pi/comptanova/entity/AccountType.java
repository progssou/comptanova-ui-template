package tn.pi.comptanova.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "account_types")
public class AccountType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(unique = true)
    private String code; // ACTIF, PASSIF, CHARGE, PRODUIT

    @NotBlank
    private String name; // Actif, Passif, Charge, Produit

    @NotBlank
    private String category; // BILAN, RESULTAT

    @NotBlank
    private String nature; // DEBIT, CREDIT

    @ManyToOne
    @JoinColumn(name = "country_id")
    private Country country;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructeurs
    public AccountType() {}

    public AccountType(String code, String name, String category, String nature) {
        this.code = code;
        this.name = name;
        this.category = category;
        this.nature = nature;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
}
