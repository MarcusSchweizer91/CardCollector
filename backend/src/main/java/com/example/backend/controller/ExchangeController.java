package com.example.backend.controller;


import com.example.backend.models.ExchangeCard;
import com.example.backend.service.ExchangeService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
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
    public ExchangeCard addEntry(@RequestPart(value = "entry") String entry, @RequestPart(value = "file") MultipartFile cardImage, Principal principal) throws IOException {
        return exchangeService.saveEntry(entry, cardImage, principal);
    }

    @GetMapping(path = "/{id}")
    public ExchangeCard getByID(@PathVariable String id) {
        return exchangeService.getEntryByID(id);
    }

    @PutMapping(path = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ExchangeCard updateEntry(@PathVariable String id, @RequestPart(value = "entry") String entryToUpdate, @RequestPart(value = "file", required = false) MultipartFile cardImage, @RequestPart(value = "author", required = false) String author) throws IOException {
        return exchangeService.updateEntry(id, entryToUpdate, cardImage, author);
    }

    @DeleteMapping(path = "/{id}")
    public void deleteEntry(@PathVariable String id) {
        exchangeService.deleteByID(id);
    }

}
