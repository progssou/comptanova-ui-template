package tn.pi.comptanova.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.pi.comptanova.dto.PricingPlanDTO;
import tn.pi.comptanova.entity.PricingPlan;
import tn.pi.comptanova.service.PricingPlanService;
import org.springframework.beans.BeanUtils;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/pricing-plans")
@CrossOrigin(origins = "http://localhost:5173")
public class PricingPlanController {
    @Autowired
    private PricingPlanService pricingPlanService;

    @GetMapping
    public List<PricingPlanDTO> getAll() {
        return pricingPlanService.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public PricingPlanDTO getById(@PathVariable Long id) {
        return pricingPlanService.findById(id).map(this::toDTO).orElse(null);
    }

    @PostMapping
    public PricingPlanDTO create(@RequestBody PricingPlanDTO dto) {
        PricingPlan entity = new PricingPlan();
        BeanUtils.copyProperties(dto, entity);
        return toDTO(pricingPlanService.save(entity));
    }

    @PutMapping("/{id}")
    public PricingPlanDTO update(@PathVariable Long id, @RequestBody PricingPlanDTO dto) {
        return pricingPlanService.findById(id).map(entity -> {
            BeanUtils.copyProperties(dto, entity);
            return toDTO(pricingPlanService.save(entity));
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        pricingPlanService.deleteById(id);
    }

    private PricingPlanDTO toDTO(PricingPlan entity) {
        PricingPlanDTO dto = new PricingPlanDTO();
        BeanUtils.copyProperties(entity, dto);
        return dto;
    }
} 