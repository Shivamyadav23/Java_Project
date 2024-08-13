package com.vita.JWT;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JwtController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private JwtRepository repository;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @PostMapping("/token")
    public ResponseEntity<?> generateToken(@RequestBody MyUser myUser) {
        try {
        	System.out.println("from controller");
            boolean result = repository.findUser(myUser);
            if (!result) {
                throw new UsernameNotFoundException("credentials don't match");
            }
            customUserDetailsService.setPassword(myUser.getPassword());
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(myUser.getUsername());
            String token = jwtUtil.generateToken(userDetails);
            return ResponseEntity.ok(new JwtResponse(token));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("An error occurred");
        }
    }
}
