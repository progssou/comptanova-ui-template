package tn.pi.comptanova.controller;

import org.springframework.web.bind.annotation.*;
import tn.pi.comptanova.dto.DocumentDTO;
import tn.pi.comptanova.entity.Document;
import tn.pi.comptanova.service.DocumentService;
import org.springframework.beans.BeanUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class DocumentController {
    private final DocumentService documentService;

    @GetMapping
    public List<DocumentDTO> getAll() {
        return documentService.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public DocumentDTO getById(@PathVariable Long id) {
        return documentService.findById(id).map(this::toDTO).orElse(null);
    }

    @PostMapping
    public DocumentDTO create(@RequestBody DocumentDTO dto) {
        Document entity = new Document();
        BeanUtils.copyProperties(dto, entity);
        return toDTO(documentService.save(entity));
    }

    @PutMapping("/{id}")
    public DocumentDTO update(@PathVariable Long id, @RequestBody DocumentDTO dto) {
        return documentService.findById(id).map(entity -> {
            BeanUtils.copyProperties(dto, entity);
            return toDTO(documentService.save(entity));
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        documentService.deleteById(id);
    }

    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<DocumentDTO>> getDocumentsByCompany(@PathVariable Long companyId) {
        return ResponseEntity.ok(documentService.getDocumentsByCompany(companyId));
    }

    private DocumentDTO toDTO(Document entity) {
        DocumentDTO dto = new DocumentDTO();
        BeanUtils.copyProperties(entity, dto);
        return dto;
    }
} 