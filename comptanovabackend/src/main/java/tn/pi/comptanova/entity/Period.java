package tn.pi.comptanova.entity;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Period {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String startDate;
    private String endDate;

} 