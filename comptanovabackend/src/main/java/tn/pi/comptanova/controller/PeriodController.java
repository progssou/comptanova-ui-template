package tn.pi.comptanova.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.pi.comptanova.dto.PeriodDTO;
import tn.pi.comptanova.entity.Period;
import tn.pi.comptanova.service.PeriodService;
import org.springframework.beans.BeanUtils;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/periods")
@CrossOrigin(origins = "http://localhost:5173")
public class PeriodController {
    @Autowired
    private PeriodService periodService;

    @GetMapping
    public List<PeriodDTO> getAll() {
        return periodService.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public PeriodDTO getById(@PathVariable Long id) {
        return periodService.findById(id).map(this::toDTO).orElse(null);
    }

    @PostMapping
    public PeriodDTO create(@RequestBody PeriodDTO dto) {
        Period entity = new Period();
        BeanUtils.copyProperties(dto, entity);
        return toDTO(periodService.save(entity));
    }

    @PutMapping("/{id}")
    public PeriodDTO update(@PathVariable Long id, @RequestBody PeriodDTO dto) {
        return periodService.findById(id).map(entity -> {
            BeanUtils.copyProperties(dto, entity);
            return toDTO(periodService.save(entity));
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        periodService.deleteById(id);
    }

    private PeriodDTO toDTO(Period entity) {
        PeriodDTO dto = new PeriodDTO();
        BeanUtils.copyProperties(entity, dto);
        return dto;
    }
} 