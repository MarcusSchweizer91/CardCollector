package com.example.backend.service;

import com.example.backend.models.ExchangeCard;
import com.example.backend.models.ExchangeCardDTO;
import com.example.backend.repo.ExchangeRepo;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class ExchangeService {

    private final ExchangeRepo exchangeRepo;

    private final IDService idService;

    public ExchangeService(ExchangeRepo exchangeRepo, IDService idService) {
        this.exchangeRepo = exchangeRepo;
        this.idService = idService;
    }


    public List<ExchangeCard> getAllEntries(){
        return exchangeRepo.findAll();
    }

    public ExchangeCard saveEntry(String exchangeCard, MultipartFile cardImage, Principal principal) throws IOException {

        ObjectMapper objectMapper = Jackson2ObjectMapperBuilder.json().build();
        ExchangeCardDTO exchangeCardDTO = objectMapper.readValue(exchangeCard, ExchangeCardDTO.class);
        String author = principal.getName();

        ExchangeCard newCartToExchange = new ExchangeCard(
                idService.generateID(),
                exchangeCardDTO.name(),
                exchangeCardDTO.description(),
                exchangeCardDTO.type(),
                exchangeCardDTO.price(),
                exchangeCardDTO.alternative(),
                Base64.getEncoder().encodeToString(cardImage.getBytes()),
                author);
        return exchangeRepo.save(newCartToExchange);
    }


    public ExchangeCard getEntryByID (String id){
        Optional<ExchangeCard> optionalEntry = exchangeRepo.findById(id);
        if(optionalEntry.isPresent()){
            return optionalEntry.get();
        }
        throw new IllegalArgumentException("Entry not found...");
    }

    public void deleteByID (String id){
        exchangeRepo.deleteById(id);
    }

    public ExchangeCard updateEntry (String id, String exchangeCard, MultipartFile cardImage, String author) throws IOException {

        ObjectMapper objectMapper = Jackson2ObjectMapperBuilder.json().build();
        ExchangeCardDTO exchangeCardDTO = objectMapper.readValue(exchangeCard, ExchangeCardDTO.class);
       

        ExchangeCard toEdit = new ExchangeCard(
                id,
                exchangeCardDTO.name(),
                exchangeCardDTO.description(),
                exchangeCardDTO.type(),
                exchangeCardDTO.price(),
                exchangeCardDTO.alternative(),
                Base64.getEncoder().encodeToString(cardImage.getBytes()),
                author);
        return exchangeRepo.save(toEdit);
    }


}
