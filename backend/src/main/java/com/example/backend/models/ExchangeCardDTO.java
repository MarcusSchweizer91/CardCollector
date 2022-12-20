package com.example.backend.models;

public record ExchangeCardDTO(

        String name,
        String description,
        String type,
        String price,
        String alternative
) {
}
