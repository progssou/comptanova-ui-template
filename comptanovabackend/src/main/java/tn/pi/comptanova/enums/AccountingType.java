package tn.pi.comptanova.enums;

public enum AccountingType {
    TUNISIAN("Tunisienne", "TND", "SYSCOHADA"),
    FRENCH("Française", "EUR", "PCG");
    
    private final String displayName;
    private final String currency;
    private final String chartOfAccounts;
    
    AccountingType(String displayName, String currency, String chartOfAccounts) {
        this.displayName = displayName;
        this.currency = currency;
        this.chartOfAccounts = chartOfAccounts;
    }
    
    public String getDisplayName() { return displayName; }
    public String getCurrency() { return currency; }
    public String getChartOfAccounts() { return chartOfAccounts; }
} 