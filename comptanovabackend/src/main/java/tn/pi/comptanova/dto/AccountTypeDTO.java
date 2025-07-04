package tn.pi.comptanova.dto;

import lombok.Data;
import tn.pi.comptanova.entity.AccountType;

import java.time.LocalDateTime;

@Data
public class AccountTypeDTO {

    private Long id;
    private String code;
    private String name;
    private String category;
    private String nature;
    private String countryCode;
    private String countryName;
    private LocalDateTime createdAt;

    // Constructeurs
    public AccountTypeDTO() {}

    public AccountTypeDTO(AccountType accountType) {
        this.id = accountType.getId();
        this.code = accountType.getCode();
        this.name = accountType.getName();
        this.category = accountType.getCategory();
        this.nature = accountType.getNature();
        this.countryCode = accountType.getCountry() != null ? accountType.getCountry().getCode() : null;
        this.countryName = accountType.getCountry() != null ? accountType.getCountry().getName() : null;
        this.createdAt = accountType.getCreatedAt();
    }
}
