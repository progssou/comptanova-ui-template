package tn.pi.comptanova.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

import tn.pi.comptanova.dto.BalanceSheetDTO;
import tn.pi.comptanova.dto.ProfitLossDTO;
import tn.pi.comptanova.service.ReportService;

import org.springframework.security.access.prepost.PreAuthorize;


@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:5173")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping("/balance-sheet")
    @PreAuthorize("hasRole('DIRIGEANT') or hasRole('COMPTABLE')")
    public ResponseEntity<BalanceSheetDTO> getBalanceSheet(
            @RequestParam Long companyId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate asOfDate) {
        try {
            BalanceSheetDTO balanceSheet = reportService.generateBalanceSheet(companyId, asOfDate);
            return ResponseEntity.ok(balanceSheet);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/profit-loss")
    @PreAuthorize("hasRole('DIRIGEANT') or hasRole('COMPTABLE')")
    public ResponseEntity<ProfitLossDTO> getProfitLoss(
            @RequestParam Long companyId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        try {
            ProfitLossDTO profitLoss = reportService.generateProfitLoss(companyId, startDate, endDate);
            return ResponseEntity.ok(profitLoss);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
