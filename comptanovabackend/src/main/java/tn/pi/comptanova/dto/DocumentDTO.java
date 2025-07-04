package tn.pi.comptanova.dto;

import lombok.Data;

@Data
public class DocumentDTO {
    private Long id;
    private String name;
    private String type;
    private String url;
    private Long companyId;
} 