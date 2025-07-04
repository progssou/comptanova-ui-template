package tn.pi.comptanova.dto;

import lombok.Data;
import tn.pi.comptanova.entity.Company;
import tn.pi.comptanova.entity.Country;
import tn.pi.comptanova.enums.AccountingType;

@Data
public class CompanyDTO {
    private Long id;
    private String name;
    private String address;
    private String phone;
    private String email;
    private String taxNumber;
    private String siret;
    private String matriculeFiscal;
    private Country country;
    private AccountingType accountingType;
    private String industry;
    private String city;
    private String postalCode;
    private String createdAt;
    private String updatedAt;

    public CompanyDTO(Company company) {
        this.id = company.getId();
        this.name = company.getName();
        this.address = company.getAddress();
        this.phone = company.getPhone();
        this.email = company.getEmail();
        this.taxNumber = company.getTaxNumber();
        this.siret = company.getSiret();
        this.matriculeFiscal = company.getMatriculeFiscal();
        this.country = company.getCountry();
        this.accountingType = company.getAccountingType();
        this.industry = company.getIndustry();
        this.city = company.getCity();
        this.postalCode = company.getPostalCode();
        this.createdAt = company.getCreatedAt() != null ? company.getCreatedAt().toString() : null;
        this.updatedAt = company.getUpdatedAt() != null ? company.getUpdatedAt().toString() : null;
    }
} 