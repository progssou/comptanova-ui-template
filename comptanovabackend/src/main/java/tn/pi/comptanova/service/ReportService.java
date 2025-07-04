package tn.pi.comptanova.service;


import tn.pi.comptanova.dto.BalanceSheetDTO;
import tn.pi.comptanova.dto.ProfitLossDTO;
import tn.pi.comptanova.entity.Account;
import tn.pi.comptanova.entity.JournalEntry;
import tn.pi.comptanova.repository.AccountRepository;
import tn.pi.comptanova.repository.JournalEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import tn.pi.comptanova.enums.EntryStatus;

@Service
public class ReportService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private JournalEntryRepository journalEntryRepository;

    public BalanceSheetDTO generateBalanceSheet(Long companyId, LocalDate asOfDate) {
        List<Account> accounts = accountRepository.findByCompanyId(companyId);

        Map<String, BigDecimal> assets = new HashMap<>();
        Map<String, BigDecimal> liabilities = new HashMap<>();
        Map<String, BigDecimal> equity = new HashMap<>();

        BigDecimal totalAssets = BigDecimal.ZERO;
        BigDecimal totalLiabilities = BigDecimal.ZERO;
        BigDecimal totalEquity = BigDecimal.ZERO;

        for (Account account : accounts) {
            String accountType = account.getAccountType().getCode();
            BigDecimal balance = account.getBalance();

            switch (accountType) {
                case "ACTIF":
                    assets.put(account.getAccountName(), balance);
                    totalAssets = totalAssets.add(balance);
                    break;
                case "PASSIF":
                    if (account.getAccountNumber().startsWith("1")) { // Capital
                        equity.put(account.getAccountName(), balance);
                        totalEquity = totalEquity.add(balance);
                    } else { // Dettes
                        liabilities.put(account.getAccountName(), balance);
                        totalLiabilities = totalLiabilities.add(balance);
                    }
                    break;
            }
        }

        BalanceSheetDTO balanceSheet = new BalanceSheetDTO();
        balanceSheet.setAsOfDate(asOfDate);
        balanceSheet.setAssets(assets);
        balanceSheet.setLiabilities(liabilities);
        balanceSheet.setEquity(equity);
        balanceSheet.setTotalAssets(totalAssets);
        balanceSheet.setTotalLiabilities(totalLiabilities);
        balanceSheet.setTotalEquity(totalEquity);

        return balanceSheet;
    }

    public ProfitLossDTO generateProfitLoss(Long companyId, LocalDate startDate, LocalDate endDate) {
        List<JournalEntry> entries = journalEntryRepository.findByCompanyIdAndDateBetween(companyId, startDate, endDate);

        Map<String, BigDecimal> revenues = new HashMap<>();
        Map<String, BigDecimal> expenses = new HashMap<>();

        BigDecimal totalRevenues = BigDecimal.ZERO;
        BigDecimal totalExpenses = BigDecimal.ZERO;

        for (JournalEntry entry : entries) {
            if (entry.getStatus() == EntryStatus.POSTED) {
                Account debitAccount = entry.getDebitAccount();
                Account creditAccount = entry.getCreditAccount();
                BigDecimal amount = entry.getAmount();

                // Produits (Revenus)
                if (creditAccount.getAccountType().getCode().equals("PRODUIT")) {
                    revenues.put(creditAccount.getAccountName(),
                            revenues.getOrDefault(creditAccount.getAccountName(), BigDecimal.ZERO).add(amount));
                    totalRevenues = totalRevenues.add(amount);
                }

                // Charges (Dépenses)
                if (debitAccount.getAccountType().getCode().equals("CHARGE")) {
                    expenses.put(debitAccount.getAccountName(),
                            expenses.getOrDefault(debitAccount.getAccountName(), BigDecimal.ZERO).add(amount));
                    totalExpenses = totalExpenses.add(amount);
                }
            }
        }

        BigDecimal netIncome = totalRevenues.subtract(totalExpenses);

        ProfitLossDTO profitLoss = new ProfitLossDTO();
        profitLoss.setStartDate(startDate);
        profitLoss.setEndDate(endDate);
        profitLoss.setRevenues(revenues);
        profitLoss.setExpenses(expenses);
        profitLoss.setTotalRevenues(totalRevenues);
        profitLoss.setTotalExpenses(totalExpenses);
        profitLoss.setNetIncome(netIncome);

        return profitLoss;
    }
}
