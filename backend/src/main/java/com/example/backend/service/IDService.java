package com.example.backend.service;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class IDService {
    public String generateID(){
        return UUID.randomUUID().toString();
    }
}
