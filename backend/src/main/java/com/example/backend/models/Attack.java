package com.example.backend.models;

import java.util.List;

public record Attack(
        String name,
        List <String> cost,
        String damage
) {
}
