package tn.pi.comptanova.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import tn.pi.comptanova.enums.Role;

@Data
public class RegisterRequest {

    @NotBlank
    @Size(min = 3, max = 50)
    private String username;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 6, max = 120)
    private String password;

    private Role role = Role.COMPTABLE;

    private Long companyId;

    // Constructeurs
    public RegisterRequest() {}

}
