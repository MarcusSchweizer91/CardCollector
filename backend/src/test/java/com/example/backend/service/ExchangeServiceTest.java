package com.example.backend.service;



import com.example.backend.models.ExchangeCard;
import com.example.backend.models.ExchangeCardDTO;

import com.example.backend.repo.ExchangeRepo;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

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

    @Test
    void getEntryByID() {

        //Given
        ExchangeCard exchangeCard = new ExchangeCard("1", "Pikachu", "BlaBla", "search", "12","Two Glurak");
        String id = "1";

        //When
        when(exchangeRepo.findById(id)).thenReturn(Optional.of(exchangeCard));
        ExchangeCard actualCard = exchangeService.getEntryByID(id);

        //Then
        assertEquals(exchangeCard, actualCard);
        verify(exchangeRepo).findById(id);


    }

    @Test
    void deleteEntryByID() {
        ExchangeCard expectedCard = new ExchangeCard(
                "1",
                "Pikachu",
                "BlaBla",
                "search",
                "12",
                "Two Glurak"
        );

        doNothing().when(exchangeRepo).deleteById(isA(String.class));
        exchangeRepo.deleteById(expectedCard.id());
        verify(exchangeRepo, times(1)).deleteById(expectedCard.id());
    }
    @Test
    void updateEntry() {

        ExchangeCardDTO cardToAdd = new ExchangeCardDTO(
                "Pikachu",
                "BlaBla",
                "search",
                "12",
                "Two Glurak"
        );

        ExchangeCard expectedCard = new ExchangeCard(
                "1",
                "Pikachu",
                "BlaBla",
                "search",
                "12",
                "Two Glurak"
        );

        //When
        when(exchangeRepo.save(expectedCard)).thenReturn(expectedCard);
        ExchangeCard actualCard = exchangeService.updateEntry("1",cardToAdd);

        //Then
        assertEquals(expectedCard, actualCard);
        verify(exchangeRepo).save(expectedCard);
    }

}