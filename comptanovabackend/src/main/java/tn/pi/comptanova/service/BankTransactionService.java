package tn.pi.comptanova.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.pi.comptanova.dto.BankTransactionDTO;
import tn.pi.comptanova.entity.BankTransaction;
import tn.pi.comptanova.repository.BankTransactionRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BankTransactionService {
    private final BankTransactionRepository bankTransactionRepository;

    public List<BankTransaction> findAll() {
        return bankTransactionRepository.findAll();
    }

    public Optional<BankTransaction> findById(Long id) {
        return bankTransactionRepository.findById(id);
    }

    public BankTransaction save(BankTransaction bankTransaction) {
        return bankTransactionRepository.save(bankTransaction);
    }

    public void deleteById(Long id) {
        bankTransactionRepository.deleteById(id);
    }

    public List<BankTransactionDTO> getBankTransactionsByCompany(Long companyId) {
        return bankTransactionRepository.findByCompanyId(companyId)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    private BankTransactionDTO toDTO(BankTransaction entity) {
        BankTransactionDTO dto = new BankTransactionDTO();
        dto.setId(entity.getId());
        dto.setDescription(entity.getDescription());
        dto.setAmount(entity.getAmount());
        dto.setDate(entity.getDate());
        dto.setCompanyId(entity.getCompany() != null ? entity.getCompany().getId() : null);
        return dto;
    }
} 