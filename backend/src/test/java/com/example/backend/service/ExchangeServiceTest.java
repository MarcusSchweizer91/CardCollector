package com.example.backend.service;


import com.example.backend.models.ExchangeCard;
import com.example.backend.models.ExchangeCardDTO;
import com.example.backend.repo.ExchangeRepo;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ExchangeServiceTest {

    ExchangeRepo exchangeRepo = mock(ExchangeRepo.class);

    IDService idService = mock(IDService.class);

    ExchangeService exchangeService = new ExchangeService(exchangeRepo,idService);

    @Test
    void getAllEntries() {

        //Given
        List<ExchangeCard> expected = Collections.emptyList();
        //When
        when(exchangeRepo.findAll()).thenReturn(expected);
        List<ExchangeCard> result = exchangeService.getAllEntries();
        //Then
        assertEquals(expected, result);
        verify(exchangeRepo).findAll();
    }



    @Test
    void saveEntry() {

        //Given
        ExchangeCardDTO cardDTO = new ExchangeCardDTO(
                "Pikachu",
                "Super Karte",
                "Search",
                "12",
                "Trade for two Bisasam"
        );


        ExchangeCard expectedCard = new ExchangeCard(
                "1",
                "Pikachu",
                "Super Karte",
                "Search",
                "12",
                "Trade for two Bisasam"
        );

        //When
        when(exchangeRepo.save(any())).thenReturn(expectedCard);
        when(idService.generateID()).thenReturn("1");

        ExchangeCard actual = exchangeService.saveEntry(cardDTO);
        //Then
        assertEquals(actual, expectedCard);
        verify(exchangeRepo).save(expectedCard);

    }
}