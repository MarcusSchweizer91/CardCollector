package com.example.backend.models;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("cards")

public record PokeCard(
        String id,
        String name,
        String hp,
        List<Attack> attacks,
        Image images
) {
}
