package tn.pi.comptanova.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Map;

@Data
public class ProfitLossDTO {

    private Long companyId;
    private LocalDate startDate;
    private LocalDate endDate;
    private Map<String, BigDecimal> revenues;
    private Map<String, BigDecimal> expenses;
    private BigDecimal totalRevenues;
    private BigDecimal totalExpenses;
    private BigDecimal netIncome;

}
