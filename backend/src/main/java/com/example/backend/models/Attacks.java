package com.example.backend.models;

import java.util.List;

public record Attacks(
        String name,
        List <String> cost,
        String damage
) {
}
