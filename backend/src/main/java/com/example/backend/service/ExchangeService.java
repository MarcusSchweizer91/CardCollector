package com.example.backend.service;

import com.example.backend.models.ExchangeCard;
import com.example.backend.models.ExchangeCardDTO;
import com.example.backend.repo.ExchangeRepo;
import org.springframework.stereotype.Service;

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

    public ExchangeCard updateEntry (String id, ExchangeCardDTO entryToUpdate){
        ExchangeCard toEdit = new ExchangeCard(
                id,
                entryToUpdate.name(),
                entryToUpdate.description(),
                entryToUpdate.type(),
                entryToUpdate.price(),
                entryToUpdate.alternative()
        );
        return exchangeRepo.save(toEdit);
    }


}
