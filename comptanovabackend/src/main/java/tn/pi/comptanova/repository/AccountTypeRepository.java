package tn.pi.comptanova.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.pi.comptanova.entity.AccountType;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountTypeRepository extends JpaRepository<AccountType, Long> {

    Optional<AccountType> findByCode(String code);
    List<AccountType> findByCategory(String category);
    List<AccountType> findByNature(String nature);

    @Query("SELECT at FROM AccountType at WHERE at.country.id = :countryId")
    List<AccountType> findByCountryId(@Param("countryId") Long countryId);

    @Query("SELECT at FROM AccountType at WHERE at.country.code = :countryCode")
    List<AccountType> findByCountryCode(@Param("countryCode") String countryCode);

    boolean existsByCode(String code);

}
