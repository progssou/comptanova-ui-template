package tn.pi.comptanova.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tn.pi.comptanova.dto.JournalEntryDTO;
import tn.pi.comptanova.entity.Account;
import tn.pi.comptanova.entity.JournalEntry;
import tn.pi.comptanova.entity.User;
import tn.pi.comptanova.enums.EntryStatus;
import tn.pi.comptanova.repository.AccountRepository;
import tn.pi.comptanova.repository.JournalEntryRepository;
import tn.pi.comptanova.repository.UserRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class JournalService {

    @Autowired
    private JournalEntryRepository journalEntryRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountService accountService;

    public List<JournalEntryDTO> getAllJournalEntries() {
        return journalEntryRepository.findAll()
                .stream()
                .map(JournalEntryDTO::new)
                .collect(Collectors.toList());
    }

    public List<JournalEntryDTO> getJournalEntriesByCompany(Long companyId) {
        return journalEntryRepository.findByCompanyId(companyId)
                .stream()
                .map(JournalEntryDTO::new)
                .collect(Collectors.toList());
    }

    public List<JournalEntryDTO> getJournalEntriesByDateRange(LocalDate startDate, LocalDate endDate) {
        return journalEntryRepository.findByEntryDateBetween(startDate, endDate)
                .stream()
                .map(JournalEntryDTO::new)
                .collect(Collectors.toList());
    }

    public JournalEntryDTO getJournalEntryById(Long id) {
        JournalEntry entry = journalEntryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Écriture comptable non trouvée avec l'ID: " + id));
        return new JournalEntryDTO(entry);
    }

    public JournalEntryDTO createJournalEntry(JournalEntryDTO entryDTO, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé: " + username));

        Account debitAccount = accountRepository.findById(entryDTO.getDebitAccount().getId())
                .orElseThrow(() -> new RuntimeException("Compte débit non trouvé"));

        Account creditAccount = accountRepository.findById(entryDTO.getCreditAccount().getId())
                .orElseThrow(() -> new RuntimeException("Compte crédit non trouvé"));

        JournalEntry entry = new JournalEntry();
        entry.setEntryDate(entryDTO.getEntryDate());
        entry.setDescription(entryDTO.getDescription());
        entry.setReference(entryDTO.getReference());
        entry.setDebitAccount(debitAccount);
        entry.setCreditAccount(creditAccount);
        entry.setAmount(entryDTO.getAmount());
        entry.setStatus(EntryStatus.DRAFT);
        entry.setCreatedBy(user);
        entry.setCreatedAt(LocalDateTime.now());
        entry.setUpdatedAt(LocalDateTime.now());

        JournalEntry savedEntry = journalEntryRepository.save(entry);
        return new JournalEntryDTO(savedEntry);
    }

    public JournalEntryDTO updateJournalEntry(Long id, JournalEntryDTO entryDTO) {
        JournalEntry entry = journalEntryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Écriture comptable non trouvée avec l'ID: " + id));

        if (entry.getStatus() == EntryStatus.POSTED) {
            throw new RuntimeException("Impossible de modifier une écriture comptabilisée");
        }

        entry.setEntryDate(entryDTO.getEntryDate());
        entry.setDescription(entryDTO.getDescription());
        entry.setReference(entryDTO.getReference());
        entry.setAmount(entryDTO.getAmount());
        entry.setUpdatedAt(LocalDateTime.now());

        JournalEntry updatedEntry = journalEntryRepository.save(entry);
        return new JournalEntryDTO(updatedEntry);
    }

    public void deleteJournalEntry(Long id) {
        JournalEntry entry = journalEntryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Écriture comptable non trouvée avec l'ID: " + id));

        if (entry.getStatus() == EntryStatus.POSTED) {
            throw new RuntimeException("Impossible de supprimer une écriture comptabilisée");
        }

        journalEntryRepository.deleteById(id);
    }

    public JournalEntryDTO validateJournalEntry(Long id) {
        JournalEntry entry = journalEntryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Écriture comptable non trouvée avec l'ID: " + id));

        entry.setStatus(EntryStatus.VALIDATED);
        entry.setUpdatedAt(LocalDateTime.now());

        JournalEntry validatedEntry = journalEntryRepository.save(entry);
        return new JournalEntryDTO(validatedEntry);
    }

    public JournalEntryDTO postJournalEntry(Long id) {
        JournalEntry entry = journalEntryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Écriture comptable non trouvée avec l'ID: " + id));

        if (entry.getStatus() != EntryStatus.VALIDATED) {
            throw new RuntimeException("L'écriture doit être validée avant d'être comptabilisée");
        }

        // Mettre à jour les soldes des comptes
        accountService.updateAccountBalance(entry.getDebitAccount().getId(), entry.getAmount(), true);
        accountService.updateAccountBalance(entry.getCreditAccount().getId(), entry.getAmount(), false);

        entry.setStatus(EntryStatus.POSTED);
        entry.setUpdatedAt(LocalDateTime.now());

        JournalEntry postedEntry = journalEntryRepository.save(entry);
        return new JournalEntryDTO(postedEntry);
    }
}
