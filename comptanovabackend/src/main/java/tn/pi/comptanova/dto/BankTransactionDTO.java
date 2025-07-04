package tn.pi.comptanova.dto;

import lombok.Data;

@Data
public class BankTransactionDTO {
    private Long id;
    private String description;
    private Double amount;
    private String date;
    private Long companyId;
} 