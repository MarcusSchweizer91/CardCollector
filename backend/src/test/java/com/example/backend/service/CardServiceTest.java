package com.example.backend.service;

import com.example.backend.models.PokeCard;
import com.example.backend.models.Image;
import com.example.backend.repo.CardRepo;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.*;

class CardServiceTest {

    CardRepo cardRepo = mock(CardRepo.class);

    CardService cardService = new CardService(cardRepo);

    @Test
    void getAllCards() {

        //Given
        List<PokeCard> expected = Collections.emptyList();
        //When
        when(cardRepo.findAll()).thenReturn(expected);
        List<PokeCard> result = cardService.getAllCards();
        //Then
        assertEquals(expected, result);
        verify(cardRepo).findAll();


    }

    @Test
    void getCardByID() {

        //Given
        Image image = new Image("image");
        PokeCard expectedCard = new PokeCard("1", "Pikachu", "120", Collections.emptyList(),image);
        String id = "1";



        //When
        when(cardRepo.findById(id)).thenReturn(Optional.of(expectedCard));
        PokeCard actualCard = cardService.getCardByID(id);
        //Then
        assertEquals(expectedCard, actualCard);
        verify(cardRepo).findById(id);


    }
}