package tn.pi.comptanova.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Map;

@Data
public class BalanceSheetDTO {

    private Long companyId;
    private LocalDate date;
    private BigDecimal totalAssets;
    private BigDecimal totalLiabilities;
    private BigDecimal totalEquity;
    private LocalDate asOfDate;
    private Map<String, BigDecimal> assets;
    private Map<String, BigDecimal> liabilities;
    private Map<String, BigDecimal> equity;

    // Constructors
    public BalanceSheetDTO() {}


}
