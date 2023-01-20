package com.example.backend.models;

import java.util.List;

public record MongoUserDTO(

        String username,
        String password,
        String email,
        List<FavoriteCard> favorites
) {
}
