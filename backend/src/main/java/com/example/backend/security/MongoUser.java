package com.example.backend.security;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("users")
public record MongoUser (
        @Id
        String id,
        String username,
        String password,
        String email,
        List<String> favorites
){
}
