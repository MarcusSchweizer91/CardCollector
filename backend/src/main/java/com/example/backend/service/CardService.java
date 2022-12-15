package com.example.backend.service;

import com.example.backend.models.Card;
import com.example.backend.repo.CardRepo;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CardService {

    private final CardRepo cardRepo;

    public CardService(CardRepo cardRepo) {
        this.cardRepo = cardRepo;
    }

    public List<Card> getAllCards(){
        return cardRepo.findAll();
    }
}
