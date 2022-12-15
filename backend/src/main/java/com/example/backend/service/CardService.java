package com.example.backend.service;

import com.example.backend.models.Card;
import com.example.backend.repo.CardRepo;

import java.util.List;

public class CardService {

    private final CardRepo cardRepo;

    public CardService(CardRepo cardRepo) {
        this.cardRepo = cardRepo;
    }

    public List<Card> getAllCards(){
        return cardRepo.findAll();
    }
}
