package tn.pi.comptanova.entity;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class PricingPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Double price;
    private String description;

} 