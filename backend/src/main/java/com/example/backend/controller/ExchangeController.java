package com.example.backend.controller;


import com.example.backend.models.ExchangeCard;
import com.example.backend.models.ExchangeCardDTO;
import com.example.backend.service.ExchangeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exchange")

public class ExchangeController {

    private final ExchangeService exchangeService;

    public ExchangeController(ExchangeService exchangeService) {
        this.exchangeService = exchangeService;
    }

    @GetMapping
    public List<ExchangeCard> getAllEntry (){
        return exchangeService.getAllEntries();
    }

    @PostMapping
    public ExchangeCard addEntry (@RequestBody ExchangeCardDTO entry){
        return exchangeService.saveEntry(entry);
    }

}
