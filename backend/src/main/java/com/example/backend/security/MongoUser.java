package com.example.backend.security;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("users")
public record MongoUser (
        @Id
        String id,
        @Indexed(unique = true)
        String username,
        String password,
        @Indexed(unique = true)
        String email,
        List<String> favorites
){
}
