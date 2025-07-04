package tn.pi.comptanova.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.pi.comptanova.dto.VATEntryDTO;
import tn.pi.comptanova.entity.VATEntry;
import tn.pi.comptanova.service.VATEntryService;
import org.springframework.beans.BeanUtils;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/vat-entries")
@CrossOrigin(origins = "http://localhost:5173")
public class VATEntryController {
    @Autowired
    private VATEntryService vatEntryService;

    @GetMapping
    public List<VATEntryDTO> getAll() {
        return vatEntryService.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public VATEntryDTO getById(@PathVariable Long id) {
        return vatEntryService.findById(id).map(this::toDTO).orElse(null);
    }

    @PostMapping
    public VATEntryDTO create(@RequestBody VATEntryDTO dto) {
        VATEntry entity = new VATEntry();
        BeanUtils.copyProperties(dto, entity);
        return toDTO(vatEntryService.save(entity));
    }

    @PutMapping("/{id}")
    public VATEntryDTO update(@PathVariable Long id, @RequestBody VATEntryDTO dto) {
        return vatEntryService.findById(id).map(entity -> {
            BeanUtils.copyProperties(dto, entity);
            return toDTO(vatEntryService.save(entity));
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        vatEntryService.deleteById(id);
    }

    private VATEntryDTO toDTO(VATEntry entity) {
        VATEntryDTO dto = new VATEntryDTO();
        BeanUtils.copyProperties(entity, dto);
        return dto;
    }
} 