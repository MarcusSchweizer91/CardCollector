package com.example.backend.security;

import java.util.List;

public record MongoUserDTO(

        String username,
        String password,
        String email,
        List<String> favorites
) {
}
