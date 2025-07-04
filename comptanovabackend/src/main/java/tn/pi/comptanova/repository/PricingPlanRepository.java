package tn.pi.comptanova.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.pi.comptanova.entity.PricingPlan;

public interface PricingPlanRepository extends JpaRepository<PricingPlan, Long> {
} 