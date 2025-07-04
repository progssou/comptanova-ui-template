package tn.pi.comptanova.entity;

import jakarta.persistence.*;
import lombok.Data;
import tn.pi.comptanova.enums.AccountingType;

@Entity
@Data
@Table(name = "vat_rates")
public class VATRate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private Double rate;
    
    @Enumerated(EnumType.STRING)
    private AccountingType accountingType;
    
    private Boolean isActive;
    

} 