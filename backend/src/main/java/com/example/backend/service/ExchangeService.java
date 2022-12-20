package com.example.backend.service;

import com.example.backend.models.ExchangeCard;
import com.example.backend.repo.ExchangeRepo;
import org.springframework.stereotype.Service;

@Service
public class ExchangeService {

    private final ExchangeRepo exchangeRepo;

    public ExchangeService(ExchangeRepo exchangeRepo) {
        this.exchangeRepo = exchangeRepo;
    }



    public ExchangeCard saveEntry(ExchangeCard exchangeCard){

        ExchangeCard newCartToExchange = new ExchangeCard(
                exchangeCard.id(),
                exchangeCard.name(),
                exchangeCard.description(),
                exchangeCard.type(),
                exchangeCard.price(),
                exchangeCard.alternative()
        );
        return exchangeRepo.save(newCartToExchange);
    }
}
