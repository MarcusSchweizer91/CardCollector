package com.example.backend.service;

import com.example.backend.models.PokeCard;
import com.example.backend.repo.CardRepo;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CardService {

    private final CardRepo cardRepo;

    public CardService(CardRepo cardRepo) {
        this.cardRepo = cardRepo;
    }

    public List<PokeCard> getAllCards(){
        return cardRepo.findAll();
    }

    public PokeCard getCardByID(String id){return cardRepo.findById(id).orElseThrow();}


}
