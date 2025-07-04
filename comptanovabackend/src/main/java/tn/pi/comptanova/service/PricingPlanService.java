package tn.pi.comptanova.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.pi.comptanova.entity.PricingPlan;
import tn.pi.comptanova.repository.PricingPlanRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PricingPlanService {
    @Autowired
    private PricingPlanRepository pricingPlanRepository;

    public List<PricingPlan> findAll() {
        return pricingPlanRepository.findAll();
    }

    public Optional<PricingPlan> findById(Long id) {
        return pricingPlanRepository.findById(id);
    }

    public PricingPlan save(PricingPlan pricingPlan) {
        return pricingPlanRepository.save(pricingPlan);
    }

    public void deleteById(Long id) {
        pricingPlanRepository.deleteById(id);
    }
} 