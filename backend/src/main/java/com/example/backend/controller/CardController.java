package com.example.backend.controller;

import com.example.backend.models.Card;
import com.example.backend.service.CardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/cards")
public class CardController {

    private final CardService cardService;

    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @GetMapping
    public List<Card> getAllCards(){
        return cardService.getAllCards();
    }

    @GetMapping (path = "/details/{id}")
    public Card getCardByID(@PathVariable String id) {return cardService.getCardByID(id);}
}
