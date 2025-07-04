package tn.pi.comptanova.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tn.pi.comptanova.dto.AccountDTO;
import tn.pi.comptanova.dto.AccountTypeDTO;
import tn.pi.comptanova.entity.Account;
import tn.pi.comptanova.entity.AccountType;
import tn.pi.comptanova.entity.Country;
import tn.pi.comptanova.repository.AccountRepository;
import tn.pi.comptanova.repository.AccountTypeRepository;
import tn.pi.comptanova.repository.CountryRepository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AccountTypeRepository accountTypeRepository;

    @Autowired
    private CountryRepository countryRepository;



    public List<AccountDTO> getAllAccounts() {
        return accountRepository.findAll()
                .stream()
                .map(AccountDTO::new)
                .collect(Collectors.toList());
    }

    public List<AccountDTO> getAccountsByCompany(Long companyId) {
        return accountRepository.findByCompanyId(companyId)
                .stream()
                .map(AccountDTO::new)
                .collect(Collectors.toList());
    }

    public AccountDTO getAccountById(Long id) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Compte non trouvé avec l'ID: " + id));
        return new AccountDTO(account);
    }

    public AccountDTO createAccount(AccountDTO accountDTO) {
        if (accountRepository.existsByAccountNumber(accountDTO.getAccountNumber())) {
            throw new RuntimeException("Un compte avec ce numéro existe déjà: " + accountDTO.getAccountNumber());
        }

        Account account = new Account();
        account.setAccountNumber(accountDTO.getAccountNumber());
        account.setAccountName(accountDTO.getAccountName());
        account.setAccountType(accountDTO.getAccountType());
        account.setBalance(accountDTO.getBalance() != null ? accountDTO.getBalance() : BigDecimal.ZERO);
        account.setIsActive(true);
        account.setCreatedAt(LocalDateTime.now());
        account.setUpdatedAt(LocalDateTime.now());
        account.setMovements(account.getMovements() + 1);

        Account savedAccount = accountRepository.save(account);
        return new AccountDTO(savedAccount);
    }

    public AccountDTO updateAccount(Long id, AccountDTO accountDTO) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Compte non trouvé avec l'ID: " + id));

        account.setAccountName(accountDTO.getAccountName());
        account.setAccountType(accountDTO.getAccountType());
        account.setIsActive(accountDTO.getIsActive());
        account.setUpdatedAt(LocalDateTime.now());

        Account updatedAccount = accountRepository.save(account);
        return new AccountDTO(updatedAccount);
    }

    public void deleteAccount(Long id) {
        if (!accountRepository.existsById(id)) {
            throw new RuntimeException("Compte non trouvé avec l'ID: " + id);
        }
        accountRepository.deleteById(id);
    }

    public void updateAccountBalance(Long accountId, BigDecimal amount, boolean isDebit) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Compte non trouvé avec l'ID: " + accountId));

        BigDecimal currentBalance = account.getBalance();
        BigDecimal newBalance;

        if (isDebit) {
            newBalance = currentBalance.add(amount);
        } else {
            newBalance = currentBalance.subtract(amount);
        }

        account.setBalance(newBalance);
        account.setUpdatedAt(LocalDateTime.now());
        accountRepository.save(account);
    }


    public AccountTypeDTO createAccountType(AccountTypeDTO accountTypeDTO) {
        if (accountTypeRepository.existsByCode(accountTypeDTO.getCode())) {
            throw new RuntimeException("Un type de compte avec ce code existe déjà: " + accountTypeDTO.getCode());
        }

        Country country = countryRepository.findByCode(accountTypeDTO.getCountryCode())
                .orElseThrow(() -> new RuntimeException("Pays non trouvé: " + accountTypeDTO.getCountryCode()));

        AccountType accountType = new AccountType();
        accountType.setCode(accountTypeDTO.getCode());
        accountType.setName(accountTypeDTO.getName());
        accountType.setCategory(accountTypeDTO.getCategory());
        accountType.setNature(accountTypeDTO.getNature());
        accountType.setCountry(country);
        accountType.setCreatedAt(LocalDateTime.now());
        accountType.setUpdatedAt(LocalDateTime.now());

        AccountType savedAccountType = accountTypeRepository.save(accountType);
        return new AccountTypeDTO(savedAccountType);
    }

}
