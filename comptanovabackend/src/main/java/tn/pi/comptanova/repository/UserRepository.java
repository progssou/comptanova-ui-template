package tn.pi.comptanova.repository;

import tn.pi.comptanova.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.management.relation.Role;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    List<User> findByRole(Role role);

    @Query("SELECT u FROM User u WHERE u.company.id = :companyId")
    List<User> findByCompanyId(@Param("companyId") Long companyId);

    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}