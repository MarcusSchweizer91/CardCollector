package com.example.backend.controller;


import com.example.backend.models.ExchangeCard;
import com.example.backend.service.ExchangeService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/exchange")

public class ExchangeController {

    private final ExchangeService exchangeService;

    public ExchangeController(ExchangeService exchangeService) {
        this.exchangeService = exchangeService;
    }

    @GetMapping
    public List<ExchangeCard> getAllEntry() {
        return exchangeService.getAllEntries();
    }

    @PostMapping
    public ExchangeCard addEntry(@RequestPart(value = "entry") String entry, @RequestPart(value = "file") MultipartFile cardImage) throws IOException {
        return exchangeService.saveEntry(entry, cardImage);
    }

    @GetMapping(path = "/{id}")
    public ExchangeCard getByID(@PathVariable String id) {
        return exchangeService.getEntryByID(id);
    }

    @PutMapping(path = "/{id}")
    public ExchangeCard updateEntry(@PathVariable String id, @RequestPart(value = "entry") String entryToUpdate, @RequestPart(value = "file") MultipartFile cardImage) throws IOException {
        return exchangeService.updateEntry(id, entryToUpdate, cardImage);
    }

    @DeleteMapping(path = "/{id}")
    public void deleteEntry(@PathVariable String id) {
        exchangeService.deleteByID(id);
    }

}
