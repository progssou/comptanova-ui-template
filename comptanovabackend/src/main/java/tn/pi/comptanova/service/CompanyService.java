package tn.pi.comptanova.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.pi.comptanova.entity.Company;
import tn.pi.comptanova.repository.CompanyRepository;

@Service
@RequiredArgsConstructor
public class CompanyService {
    private final CompanyRepository companyRepository;

    public Company findById(Long id) {
        return companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found"));
    }
} 