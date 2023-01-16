package com.example.backend.models;


import org.springframework.data.mongodb.core.mapping.Document;

@Document("exchangeOffers")
public record ExchangeCard(
String id,
String name,
String description,
String type,
String price,
String alternative,
String base64Image
) {
}
