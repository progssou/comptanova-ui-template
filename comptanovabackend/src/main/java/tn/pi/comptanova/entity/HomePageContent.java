package tn.pi.comptanova.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class HomePageContent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String content;
} 