package com.vita.JWT;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private String password;

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		System.out.println("inside loaduserbyname method");
        return new User(username, password, new ArrayList<>());
    }
}
