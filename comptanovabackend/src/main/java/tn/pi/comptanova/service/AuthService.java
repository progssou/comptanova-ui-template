package tn.pi.comptanova.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import tn.pi.comptanova.config.security.JwtUtil;
import tn.pi.comptanova.dto.LoginRequest;
import tn.pi.comptanova.dto.LoginResponse;
import tn.pi.comptanova.dto.RegisterRequest;
import tn.pi.comptanova.dto.UserDTO;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;


    public LoginResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token = jwtUtil.generateToken(userDetails);
        UserDTO user = userService.getUserByUsername(loginRequest.getUsername());
        return new LoginResponse(token, user);
    }


    public UserDTO register(RegisterRequest registerRequest) {
        return userService.createUser(registerRequest);
    }

}
