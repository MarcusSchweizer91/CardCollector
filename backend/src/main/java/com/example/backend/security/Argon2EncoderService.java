package com.example.backend.security;


import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class Argon2EncoderService {

    Argon2PasswordEncoder passwordEncoder = new Argon2PasswordEncoder();
    public String encode (String password){
        return passwordEncoder.encode(password);
    }
}
