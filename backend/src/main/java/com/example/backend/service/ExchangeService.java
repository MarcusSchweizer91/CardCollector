package com.example.backend.service;

import com.example.backend.models.ExchangeCard;
import com.example.backend.models.ExchangeCardDTO;
import com.example.backend.repo.ExchangeRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExchangeService {

    private final ExchangeRepo exchangeRepo;

    private final IDService idService;

    public List<ExchangeCard> getAllEntries(){
        return exchangeRepo.findAll();
    }

    public ExchangeService(ExchangeRepo exchangeRepo, IDService idService) {
        this.exchangeRepo = exchangeRepo;
        this.idService = idService;
    }



    public ExchangeCard saveEntry(ExchangeCardDTO exchangeCard){

        ExchangeCard newCartToExchange = new ExchangeCard(
                idService.generateID(),
                exchangeCard.name(),
                exchangeCard.description(),
                exchangeCard.type(),
                exchangeCard.price(),
                exchangeCard.alternative()
        );
        return exchangeRepo.save(newCartToExchange);
    }
}
