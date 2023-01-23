package com.example.backend.controller;

import com.example.backend.models.PokeCard;
import com.example.backend.service.CardService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/cards")
public class CardController {

    private final CardService cardService;

    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @GetMapping
    public List<PokeCard> getAllCards(){
        return cardService.getAllCards();
    }

    @GetMapping (path = "/details/{id}")
    public PokeCard getCardByID(@PathVariable String id) {return cardService.getCardByID(id);}


}
