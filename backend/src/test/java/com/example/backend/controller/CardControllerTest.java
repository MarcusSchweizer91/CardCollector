package com.example.backend.controller;


import com.example.backend.models.Card;
import com.example.backend.repo.CardRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;


import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
class CardControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CardRepo cardRepo;



    @Test
    @DirtiesContext
    void getAllCard_whenListEmpty_ThenReturn() throws Exception {

        mockMvc.perform(get("/api/cards"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    void getCardById() throws Exception {

        Card card = new Card("1", "Pikachu", "120", Collections.emptyList());
        Card result = cardRepo.save(card);

        mockMvc.perform(get("/api/cards/" + result.id()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                        "id": "<ID>",
                        "name": "Pikachu",
                        "hp": "120",
                        "attacks":[]
                        }
                        
                        """.replace("<ID>", result.id())));
    }
}