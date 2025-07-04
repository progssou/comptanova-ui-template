package tn.pi.comptanova.entity;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class VATEntry {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double amount;
    private String type;
    private String date;
} 