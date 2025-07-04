package tn.pi.comptanova.controller;


import org.springframework.web.bind.annotation.*;
import tn.pi.comptanova.dto.BankTransactionDTO;
import tn.pi.comptanova.entity.BankTransaction;
import tn.pi.comptanova.service.BankTransactionService;
import org.springframework.beans.BeanUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bank-transactions")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class BankTransactionController {
    private final BankTransactionService bankTransactionService;

    @GetMapping
    public List<BankTransactionDTO> getAll() {
        return bankTransactionService.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public BankTransactionDTO getById(@PathVariable Long id) {
        return bankTransactionService.findById(id).map(this::toDTO).orElse(null);
    }

    @PostMapping
    public BankTransactionDTO create(@RequestBody BankTransactionDTO dto) {
        BankTransaction entity = new BankTransaction();
        BeanUtils.copyProperties(dto, entity);
        return toDTO(bankTransactionService.save(entity));
    }

    @PutMapping("/{id}")
    public BankTransactionDTO update(@PathVariable Long id, @RequestBody BankTransactionDTO dto) {
        return bankTransactionService.findById(id).map(entity -> {
            BeanUtils.copyProperties(dto, entity);
            return toDTO(bankTransactionService.save(entity));
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        bankTransactionService.deleteById(id);
    }

    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<BankTransactionDTO>> getBankTransactionsByCompany(@PathVariable Long companyId) {
        return ResponseEntity.ok(bankTransactionService.getBankTransactionsByCompany(companyId));
    }

    private BankTransactionDTO toDTO(BankTransaction entity) {
        BankTransactionDTO dto = new BankTransactionDTO();
        BeanUtils.copyProperties(entity, dto);
        return dto;
    }
} 