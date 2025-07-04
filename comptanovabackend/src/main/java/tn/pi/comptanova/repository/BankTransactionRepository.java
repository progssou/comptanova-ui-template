package tn.pi.comptanova.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tn.pi.comptanova.entity.BankTransaction;
import java.util.List;

public interface BankTransactionRepository extends JpaRepository<BankTransaction, Long> {
    @Query("SELECT b FROM BankTransaction b WHERE b.company.id = :companyId")
    List<BankTransaction> findByCompanyId(@Param("companyId") Long companyId);
} 