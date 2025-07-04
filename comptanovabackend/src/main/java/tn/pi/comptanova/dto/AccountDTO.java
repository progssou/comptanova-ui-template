package tn.pi.comptanova.dto;

import lombok.Data;
import tn.pi.comptanova.entity.Account;
import tn.pi.comptanova.entity.AccountType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class AccountDTO {
    private Long id;
    private String accountNumber;
    private String accountName;
    private AccountType accountType;
    private BigDecimal balance;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Integer movements;
    private String type;
    private String code;

    // Constructeurs
    public AccountDTO() {}

    public AccountDTO(Account account) {
        this.id = account.getId();
        this.accountNumber = account.getAccountNumber();
        this.accountName = account.getAccountName();
        this.accountType = account.getAccountType();
        this.balance = account.getBalance();
        this.isActive = account.getIsActive();
        this.createdAt = account.getCreatedAt();
        this.updatedAt = account.getUpdatedAt();
        this.movements = account.getMovements();
        this.type = account.getAccountType().getCode();
        this.code = account.getAccountType().getCode();
    }
}
