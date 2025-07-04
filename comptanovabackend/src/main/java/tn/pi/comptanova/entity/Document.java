package tn.pi.comptanova.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String type;
    private String url;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;
} 