package tn.pi.comptanova.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.pi.comptanova.dto.AccountTypeDTO;
import tn.pi.comptanova.entity.AccountType;
import tn.pi.comptanova.repository.AccountTypeRepository;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AccountTypeService {
    @Autowired
    private AccountTypeRepository accountTypeRepository;

    public List<AccountTypeDTO> getAllAccountTypes() {
        return accountTypeRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<AccountTypeDTO> getAccountTypesByCountry(String country) {
        return accountTypeRepository.findByCountryCode(country).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public AccountTypeDTO getAccountTypeById(Long id) {
        return accountTypeRepository.findById(id)
                .map(this::toDTO)
                .orElse(null);
    }

    public AccountTypeDTO createAccountType(AccountTypeDTO dto) {
        AccountType entity = new AccountType();
        // Map fields from dto to entity as needed
        entity.setCode(dto.getCode());
        entity.setName(dto.getName());
        // Set other fields as needed
        AccountType saved = accountTypeRepository.save(entity);
        return toDTO(saved);
    }

    private AccountTypeDTO toDTO(AccountType entity) {
        AccountTypeDTO dto = new AccountTypeDTO();
        dto.setId(entity.getId());
        dto.setCode(entity.getCode());
        dto.setName(entity.getName());
        // Map other fields as needed
        return dto;
    }
}
