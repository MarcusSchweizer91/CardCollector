package com.example.backend.service;



import com.example.backend.models.ExchangeCard;


import com.example.backend.models.ExchangeCardDTO;
import com.example.backend.repo.ExchangeRepo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.Base64;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ExchangeServiceTest {

    ExchangeRepo exchangeRepo = mock(ExchangeRepo.class);

    IDService idService = mock(IDService.class);
    Principal principal = mock(Principal.class);

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
    void saveEntry() throws IOException {

        //Given
        String exchangeCardDTO = "{\"name\":\"Pikachu\",\"description\":\"Super Karte\",\"type\":\"Search\",\"price\":\"12\",\"alternative\":\"Trade for two Bisasam\",\"author\":\"Hans\"}";
        MultipartFile cardImage = mock(MultipartFile.class);
        when(cardImage.getBytes()).thenReturn("image bytes".getBytes());
        String author = principal.getName();

        ExchangeCard expectedCard = new ExchangeCard(
                "1",
                "Pikachu",
                "Super Karte",
                "Search",
                "12",
                "Trade for two Bisasam",
                Base64.getEncoder().encodeToString(cardImage.getBytes()),
                author


        );

        //When
        when(exchangeRepo.save(any())).thenReturn(expectedCard);
        when(idService.generateID()).thenReturn("1");

        ExchangeCard actual = exchangeService.saveEntry(exchangeCardDTO, cardImage, principal);

        //Then
        assertEquals(actual, expectedCard);
        verify(exchangeRepo).save(expectedCard);

    }

    @Test
    void getEntryByID() {

        //Given
        ExchangeCard exchangeCard = new ExchangeCard("1", "Pikachu", "BlaBla", "search", "12","Two Glurak", "base64String","Bob");
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
                "Two Glurak",
                "base64String",
                "Bob"
        );

        doNothing().when(exchangeRepo).deleteById(isA(String.class));
        exchangeRepo.deleteById(expectedCard.id());
        verify(exchangeRepo, times(1)).deleteById(expectedCard.id());
    }


    @Test
    void testUpdateEntry() throws IOException {
        String id = "1";
        String exchangeCard = "{\"name\":\"Test Card\",\"description\":\"Test Description\",\"type\":\"Test Type\",\"price\":10,\"alternative\":\"Test Alternative\"}";
        MockMultipartFile cardImage = new MockMultipartFile("cardImage", "test.jpg", "image/jpeg", "Test Image".getBytes());
        String author = "Test Author";

        ObjectMapper objectMapper = Jackson2ObjectMapperBuilder.json().build();
        ExchangeCardDTO exchangeCardDTO = objectMapper.readValue(exchangeCard, ExchangeCardDTO.class);
        ExchangeCard existingCard = new ExchangeCard("1", "Existing Card", "Existing Description", "Existing Type", "20", "Existing Alternative", null, "Existing Author");
        String base64Image = Base64.getEncoder().encodeToString(cardImage.getBytes());

        ExchangeCard toEdit = new ExchangeCard(
                id,
                exchangeCardDTO.name(),
                exchangeCardDTO.description(),
                exchangeCardDTO.type(),
                exchangeCardDTO.price(),
                exchangeCardDTO.alternative(),
                base64Image,
                author
        );

        when(exchangeRepo.findById(id)).thenReturn(Optional.of(existingCard));
        when(exchangeRepo.save(toEdit)).thenReturn(toEdit);

        ExchangeCard result = exchangeService.updateEntry(id, exchangeCard, cardImage, author);

        assertEquals(toEdit, result);
        verify(exchangeRepo, times(1)).findById(id);
        verify(exchangeRepo, times(1)).save(toEdit);
    }

    @Test
    void updateEntryWithoutChanges() throws IOException {
        // Given
        String exchangeCardDTO = "{}";
        MultipartFile cardImage = mock(MultipartFile.class);
        when(cardImage.getBytes()).thenReturn("image bytes".getBytes());

        ExchangeCard existingCard = new ExchangeCard(
                "1",
                "Pikachu",
                "Super Karte",
                "Search",
                "12",
                "Trade for two Bisasam",
                Base64.getEncoder().encodeToString(cardImage.getBytes()),
                "Bob"
        );

        // When
        when(exchangeRepo.findById("1")).thenReturn(Optional.of(existingCard));
        when(exchangeRepo.save(existingCard)).thenReturn(existingCard);

        ExchangeCard actualCard = exchangeService.updateEntry("1", exchangeCardDTO, cardImage, "Bob");

        // Then
        assertEquals(existingCard, actualCard);
        verify(exchangeRepo).save(existingCard);
    }



}