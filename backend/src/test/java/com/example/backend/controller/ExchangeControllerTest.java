package com.example.backend.controller;

import com.example.backend.models.ExchangeCard;

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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ExchangeControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;


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
}