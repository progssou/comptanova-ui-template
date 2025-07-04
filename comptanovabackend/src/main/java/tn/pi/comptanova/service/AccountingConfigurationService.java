package tn.pi.comptanova.service;

import org.springframework.stereotype.Service;
import tn.pi.comptanova.enums.AccountingType;
import java.util.HashMap;
import java.util.Map;

@Service
public class AccountingConfigurationService {
    
    // Configuration des taux de TVA par type de comptabilité
    private final Map<AccountingType, Map<String, Double>> vatRates = new HashMap<>();
    
    public AccountingConfigurationService() {
        // Configuration TVA Tunisienne
        Map<String, Double> tunisianVAT = new HashMap<>();
        tunisianVAT.put("Standard", 19.0);
        tunisianVAT.put("Réduit 1", 13.0);
        tunisianVAT.put("Réduit 2", 7.0);
        tunisianVAT.put("Spécial", 29.0);
        vatRates.put(AccountingType.TUNISIAN, tunisianVAT);
        
        // Configuration TVA Française
        Map<String, Double> frenchVAT = new HashMap<>();
        frenchVAT.put("Standard", 20.0);
        frenchVAT.put("Réduit 1", 10.0);
        frenchVAT.put("Réduit 2", 5.5);
        frenchVAT.put("Spécial", 2.1);
        vatRates.put(AccountingType.FRENCH, frenchVAT);
    }
    
    public Map<String, Double> getVATRates(AccountingType accountingType) {
        return vatRates.get(accountingType);
    }
    
    public String getCurrency(AccountingType accountingType) {
        return accountingType.getCurrency();
    }
    
    public String getChartOfAccounts(AccountingType accountingType) {
        return accountingType.getChartOfAccounts();
    }
    
    public String getDateFormat(AccountingType accountingType) {
        // Les deux utilisent DD/MM/YYYY
        return "dd/MM/yyyy";
    }
    
    public String getDecimalSeparator(AccountingType accountingType) {
        // Tunisie peut utiliser point ou virgule, France utilise virgule
        return accountingType == AccountingType.FRENCH ? "," : ".";
    }
} 