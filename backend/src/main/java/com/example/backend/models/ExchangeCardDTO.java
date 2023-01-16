package com.example.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.web.multipart.MultipartFile;

public record ExchangeCardDTO(

        String name,
        String description,
        String type,
        String price,
        String alternative,
       @JsonIgnore
        MultipartFile cardImage
) {
}
