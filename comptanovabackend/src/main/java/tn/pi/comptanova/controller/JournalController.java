package tn.pi.comptanova.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.pi.comptanova.dto.JournalEntryDTO;
import tn.pi.comptanova.service.JournalService;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/journals")
@CrossOrigin(origins = "http://localhost:5173")
public class JournalController {

    @Autowired
    private JournalService journalService;

    @GetMapping
    public ResponseEntity<List<JournalEntryDTO>> getAllJournalEntries() {
        List<JournalEntryDTO> entries = journalService.getAllJournalEntries();
        return ResponseEntity.ok(entries);
    }

    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<JournalEntryDTO>> getJournalEntriesByCompany(@PathVariable Long companyId) {
        List<JournalEntryDTO> entries = journalService.getJournalEntriesByCompany(companyId);
        return ResponseEntity.ok(entries);
    }

    @GetMapping("/date-range")
    public ResponseEntity<List<JournalEntryDTO>> getJournalEntriesByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<JournalEntryDTO> entries = journalService.getJournalEntriesByDateRange(startDate, endDate);
        return ResponseEntity.ok(entries);
    }

    @GetMapping("/{id}")
    public ResponseEntity<JournalEntryDTO> getJournalEntryById(@PathVariable Long id) {
        try {
            JournalEntryDTO entry = journalService.getJournalEntryById(id);
            return ResponseEntity.ok(entry);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<JournalEntryDTO> createJournalEntry(
            @RequestBody JournalEntryDTO entryDTO,
            @RequestParam String username) {
        try {
            JournalEntryDTO createdEntry = journalService.createJournalEntry(entryDTO, username);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdEntry);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<JournalEntryDTO> updateJournalEntry(@PathVariable Long id, @RequestBody JournalEntryDTO entryDTO) {
        try {
            JournalEntryDTO updatedEntry = journalService.updateJournalEntry(id, entryDTO);
            return ResponseEntity.ok(updatedEntry);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJournalEntry(@PathVariable Long id) {
        try {
            journalService.deleteJournalEntry(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}/validate")
    public ResponseEntity<JournalEntryDTO> validateJournalEntry(@PathVariable Long id) {
        try {
            JournalEntryDTO validatedEntry = journalService.validateJournalEntry(id);
            return ResponseEntity.ok(validatedEntry);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}/post")
    public ResponseEntity<JournalEntryDTO> postJournalEntry(@PathVariable Long id) {
        try {
            JournalEntryDTO postedEntry = journalService.postJournalEntry(id);
            return ResponseEntity.ok(postedEntry);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
