package tn.pi.comptanova.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.pi.comptanova.dto.AccountTypeDTO;
import tn.pi.comptanova.service.AccountTypeService;

import java.util.List;



@RestController
@RequestMapping("/api/account-types")
@CrossOrigin(origins = "http://localhost:5173")
public class AccountTypeController {

    @Autowired
    private AccountTypeService accountTypeService;

    @GetMapping
    public ResponseEntity<List<AccountTypeDTO>> getAllAccountTypes() {
        List<AccountTypeDTO> accountTypes = accountTypeService.getAllAccountTypes();
        return ResponseEntity.ok(accountTypes);
    }

    @GetMapping("/country/{countryCode}")
    public ResponseEntity<List<AccountTypeDTO>> getAccountTypesByCountry(@PathVariable String countryCode) {
        List<AccountTypeDTO> accountTypes = accountTypeService.getAccountTypesByCountry(countryCode);
        return ResponseEntity.ok(accountTypes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AccountTypeDTO> getAccountTypeById(@PathVariable Long id) {
        try {
            AccountTypeDTO accountType = accountTypeService.getAccountTypeById(id);
            return ResponseEntity.ok(accountType);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<AccountTypeDTO> createAccountType(@RequestBody AccountTypeDTO accountTypeDTO) {
        try {
            AccountTypeDTO createdAccountType = accountTypeService.createAccountType(accountTypeDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdAccountType);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
