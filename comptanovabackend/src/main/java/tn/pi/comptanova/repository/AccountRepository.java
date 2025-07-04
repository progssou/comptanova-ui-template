package tn.pi.comptanova.repository;

import tn.pi.comptanova.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.pi.comptanova.entity.AccountType;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByAccountNumber(String accountNumber);
    List<Account> findByAccountType(AccountType accountType);
    List<Account> findByIsActiveTrue();

    @Query("SELECT a FROM Account a WHERE a.company.id = :companyId")
    List<Account> findByCompanyId(@Param("companyId") Long companyId);

    @Query("SELECT a FROM Account a WHERE a.company.id = :companyId AND a.accountType = :type")
    List<Account> findByCompanyIdAndAccountType(@Param("companyId") Long companyId,
                                                @Param("type") AccountType type);

    boolean existsByAccountNumber(String accountNumber);
}
