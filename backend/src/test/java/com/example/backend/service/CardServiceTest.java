package com.example.backend.service;

import com.example.backend.models.Card;
import com.example.backend.repo.CardRepo;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.*;

class CardServiceTest {

    CardRepo cardRepo = mock(CardRepo.class);

    CardService cardService = new CardService(cardRepo);

    @Test
    void getAllCards() {

        //Given
        List<Card> expected = Collections.emptyList();
        //When
        when(cardRepo.findAll()).thenReturn(expected);
        List<Card> result = cardService.getAllCards();
        //Then
        assertEquals(expected, result);
        verify(cardRepo).findAll();


    }
}