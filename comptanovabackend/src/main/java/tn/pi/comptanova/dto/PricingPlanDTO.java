package tn.pi.comptanova.dto;

import lombok.Data;

@Data
public class PricingPlanDTO {
    private Long id;
    private String name;
    private Double price;
    private String description;
} 