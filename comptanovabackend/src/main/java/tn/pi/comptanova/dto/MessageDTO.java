package tn.pi.comptanova.dto;

import lombok.Data;

@Data
public class MessageDTO {
    private Long id;
    private String sender;
    private String content;
    private String timestamp;
    private Long companyId;
} 