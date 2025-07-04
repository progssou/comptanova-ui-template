package tn.pi.comptanova.entity;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String sender;
    private String content;
    private String timestamp;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;
} 