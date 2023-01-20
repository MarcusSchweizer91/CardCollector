package com.example.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;


import java.util.Set;

@Document("users")
public record MongoUser (
        @Id
        String id,
        @Indexed(unique = true)
        String username,
        String password,
        @Indexed(unique = true)
        String email,
        Set<FavoriteCard> favorites
){
}
