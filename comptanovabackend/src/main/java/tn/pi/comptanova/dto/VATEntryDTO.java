package tn.pi.comptanova.dto;

import lombok.Data;

@Data
public class VATEntryDTO {
    private Long id;
    private Double amount;
    private String type;
    private String date;
} 