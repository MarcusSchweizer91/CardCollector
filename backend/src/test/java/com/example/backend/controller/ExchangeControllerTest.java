package com.example.backend.controller;

import com.example.backend.models.ExchangeCard;

import com.example.backend.repo.ExchangeRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import com.fasterxml.jackson.databind.ObjectMapper;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ExchangeControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ExchangeRepo exchangeRepo;


    @Test
    void getAllEntries_whenListEmpty_thenReturn() throws Exception {

        mockMvc.perform(get("/api/exchange"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));


    }

    @Test
    @DirtiesContext
    void addEntry() throws Exception {

        MvcResult result = mockMvc.perform(post("/api/exchange")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                """
                                        {
                                        "name": "Pikachu",
                                        "description": "ABC",
                                        "type": "search",
                                        "price": 8.50,
                                        "alternative": "Trade for two Glurak"
                                        }
                                        """
                        ))
                .andExpect(status().isOk())
                .andReturn();

        String content = result.getResponse().getContentAsString();
        ExchangeCard cardToExchange = objectMapper.readValue(content, ExchangeCard.class);
        assertNotNull(cardToExchange.id());
    }

    @Test
    @DirtiesContext
    void getEntryByID() throws Exception {

        ExchangeCard cardToExchange = new ExchangeCard(
                "1",
                "Pikachu",
                "BlaBla",
                "search",
                "12",
                "Two Glurak"

        );
        ExchangeCard result = exchangeRepo.save(cardToExchange);
        mockMvc.perform(get("/api/exchange/" + result.id()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                           "id": "<ID>",
                           "name": "Pikachu",
                           "description": "BlaBla",
                           "type": "search",
                           "price": "12",
                            "alternative": "Two Glurak"
                        }
                        """.replace("<ID>", result.id())));
    }

    @Test
    @DirtiesContext
    void updateEntry() throws Exception {
        ExchangeCard cardToExchange = new ExchangeCard(
                "1",
                "Pikachu",
                "BlaBla",
                "search",
                "12",
                "Two Glurak"

        );
        exchangeRepo.save(cardToExchange);

        mockMvc.perform(put("/api/exchange/" + cardToExchange.id())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                """
                                             {
                                         "id": "1",
                                        "name": "Bisasam",
                                        "description": "BlaBla",
                                        "type": "search",
                                        "price": "12",
                                        "alternative": "Two Glurak"
                                             }
                                                     """
                        ))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                      {
                                "id": "1",
                                "name": "Bisasam",
                                "description": "BlaBla",
                                "type": "search",
                                "price": "12",
                                 "alternative": "Two Glurak"
                                      }
                                      """
                ));
    }

    @Test
    @DirtiesContext
    void deleteEntry() throws Exception {
        ExchangeCard cardToExchange = new ExchangeCard(
                "1",
                "Pikachu",
                "BlaBla",
                "search",
                "12",
                "Two Glurak"

        );
        exchangeRepo.save(cardToExchange);

        mockMvc.perform(delete("/api/exchange/" + cardToExchange.id()))
                .andExpect(status().isOk());
    }


}