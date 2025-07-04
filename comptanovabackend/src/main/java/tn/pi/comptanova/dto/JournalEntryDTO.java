package tn.pi.comptanova.dto;

import lombok.Data;
import tn.pi.comptanova.entity.JournalEntry;
import tn.pi.comptanova.enums.EntryStatus;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class JournalEntryDTO {
    private Long id;
    private LocalDate entryDate;
    private String description;
    private String reference;
    private AccountDTO debitAccount;
    private AccountDTO creditAccount;
    private BigDecimal amount;
    private EntryStatus status;
    private LocalDateTime createdAt;
    private String createdByUsername;

    // Constructeurs
    public JournalEntryDTO() {}

    public JournalEntryDTO(JournalEntry entry) {
        this.id = entry.getId();
        this.entryDate = entry.getEntryDate();
        this.description = entry.getDescription();
        this.reference = entry.getReference();
        this.debitAccount = new AccountDTO(entry.getDebitAccount());
        this.creditAccount = new AccountDTO(entry.getCreditAccount());
        this.amount = entry.getAmount();
        this.status = entry.getStatus();
        this.createdAt = entry.getCreatedAt();
        this.createdByUsername = entry.getCreatedBy() != null ? entry.getCreatedBy().getUsername() : null;
    }
}
