package tn.pi.comptanova.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.pi.comptanova.entity.Period;

public interface PeriodRepository extends JpaRepository<Period, Long> {
} 