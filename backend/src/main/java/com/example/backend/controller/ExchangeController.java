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

    @GetMapping (path = "/{id}")
    public ExchangeCard getByID (@PathVariable String id){
        return exchangeService.getEntryByID(id);
    }

    @PutMapping (path = "/{id}")
    public ExchangeCard updateEntry (@PathVariable String id, @RequestBody ExchangeCardDTO entryToUpdate){
        return exchangeService.updateEntry(id, entryToUpdate);
    }

    @DeleteMapping (path = "/{id}")
    public void deleteEntry (@PathVariable String id){
        exchangeService.deleteByID(id);
    }

}
