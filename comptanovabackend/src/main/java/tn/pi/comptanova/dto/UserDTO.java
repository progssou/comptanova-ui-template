package tn.pi.comptanova.dto;

import lombok.Data;
import tn.pi.comptanova.entity.User;
import tn.pi.comptanova.enums.Role;
import java.time.LocalDateTime;

@Data
public class UserDTO {

    private Long id;
    private String username;
    private String email;
    private Role role;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String companyName;
    private Long companyId;

    private String firstName;
    private String lastName;
    private String status;
    private Boolean active; // Dérivé de status, pour compatibilité UI
    private LocalDateTime lastLogin;

    // Constructeurs
    public UserDTO() {}

    public UserDTO(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.role = user.getRole();
        this.createdAt = user.getCreatedAt();
        this.updatedAt = user.getUpdatedAt();
        this.companyName = user.getCompany() != null ? user.getCompany().getName() : null;
        this.companyId = user.getCompanyId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.status = user.getStatus();
        this.active = user.getStatus().equals("active");
        this.lastLogin = user.getLastLogin();
    }
}
