package tn.pi.comptanova.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.pi.comptanova.entity.JournalEntry;
import tn.pi.comptanova.enums.EntryStatus;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface JournalEntryRepository extends JpaRepository<JournalEntry, Long> {
    List<JournalEntry> findByEntryDateBetween(LocalDate startDate, LocalDate endDate);
    List<JournalEntry> findByStatus(EntryStatus status);

    @Query("SELECT j FROM JournalEntry j WHERE j.company.id = :companyId")
    List<JournalEntry> findByCompanyId(@Param("companyId") Long companyId);

    @Query("SELECT j FROM JournalEntry j WHERE j.company.id = :companyId AND j.entryDate BETWEEN :startDate AND :endDate")
    List<JournalEntry> findByCompanyIdAndDateBetween(@Param("companyId") Long companyId,
                                                     @Param("startDate") LocalDate startDate,
                                                     @Param("endDate") LocalDate endDate);

    @Query("SELECT j FROM JournalEntry j WHERE (j.debitAccount.id = :accountId OR j.creditAccount.id = :accountId)")
    List<JournalEntry> findByAccountId(@Param("accountId") Long accountId);
}
