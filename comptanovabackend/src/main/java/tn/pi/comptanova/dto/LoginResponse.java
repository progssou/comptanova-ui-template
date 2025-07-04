package tn.pi.comptanova.dto;

import lombok.Data;

@Data
public class LoginResponse {

    private String token;
    private String type = "Bearer";
    private UserDTO user;

    // Constructeurs
    public LoginResponse() {}

    public LoginResponse(String token, UserDTO user) {
        this.token = token;
        this.user = user;
    }




}
