package tn.pi.comptanova.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.pi.comptanova.dto.CompanyDTO;
import tn.pi.comptanova.entity.Company;
import tn.pi.comptanova.service.CompanyService;

@RestController
@RequestMapping("/api/companies")
@RequiredArgsConstructor
public class CompanyController {
    private final CompanyService companyService;

    @GetMapping("/{id}")
    public ResponseEntity<CompanyDTO> getCompany(@PathVariable Long id) {
        Company company = companyService.findById(id);
        return ResponseEntity.ok(new CompanyDTO(company));
    }
} 