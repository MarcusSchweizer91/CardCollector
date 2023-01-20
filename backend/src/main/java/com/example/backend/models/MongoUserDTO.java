package com.example.backend.models;


import java.util.Set;

public record MongoUserDTO(

        String username,
        String password,
        String email,
        Set<FavoriteCard> favorites
) {
}
