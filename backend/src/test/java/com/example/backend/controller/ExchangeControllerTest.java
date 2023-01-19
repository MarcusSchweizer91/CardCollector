package com.example.backend.controller;

import com.example.backend.models.ExchangeCard;

import com.example.backend.repo.ExchangeRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;


import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ExchangeControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ExchangeRepo exchangeRepo;

    @WithMockUser("spring")
    @Test
    void getAllEntries_whenListEmpty_thenReturn() throws Exception {

        mockMvc.perform(get("/api/exchange"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));


    }
    @WithMockUser("spring")
    @Test
    @DirtiesContext
    void addEntry() throws Exception {


        MockMultipartFile entry = new MockMultipartFile("entry", """
                {
                "id": "1",
                "name": "Pikachu",
                "description": "BlaBla",
                "price": "12",
                "alternative": "Two Glurak",
                "base64Image": ""
                }
                """.getBytes());

        MockMultipartFile file = new MockMultipartFile("file", "".getBytes());

        mockMvc.perform(MockMvcRequestBuilders.multipart("/api/exchange")
                        .file(entry)
                        .file(file).with(csrf()))
                .andExpect(status().isOk());

    }


    @WithMockUser("spring")
    @Test
    @DirtiesContext
    void getEntryByID() throws Exception {

        ExchangeCard cardToExchange = new ExchangeCard(
                "1",
                "Pikachu",
                "BlaBla",
                "search",
                "12",
                "Two Glurak",
                "base64String"

        );
        ExchangeCard result = exchangeRepo.save(cardToExchange);
        mockMvc.perform(get("/api/exchange/" + result.id()).with(csrf()))
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


    @WithMockUser("spring")
    @Test
    @DirtiesContext
    void updateEntry() throws Exception {
        ExchangeCard cardToExchange = new ExchangeCard(
                "1",
                "Pikachu",
                "BlaBla",
                "search",
                "12",
                "Two Glurak",
                "base64String");

        exchangeRepo.save(cardToExchange);

        MockMultipartFile entry = new MockMultipartFile("entry", """
            {
            "id": "1",
            "name": "Bisasam",
            "description": "BlaBla",
            "price": "12",
            "alternative": "Two Glurak",
            "base64Image": ""
            }
            """.getBytes());

        MockMultipartFile file = new MockMultipartFile("file", "".getBytes());

        mockMvc.perform(MockMvcRequestBuilders.multipart(HttpMethod.PUT,"/api/exchange/" + cardToExchange.id())
                        .file(entry)
                        .file(file)
                        .with(csrf())
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isOk());
    }


    @WithMockUser("spring")
    @Test
    @DirtiesContext
    void deleteEntry() throws Exception {
        ExchangeCard cardToExchange = new ExchangeCard(
                "1",
                "Pikachu",
                "BlaBla",
                "search",
                "12",
                "Two Glurak",
                "base64String"

        );
        exchangeRepo.save(cardToExchange);

        mockMvc.perform(delete("/api/exchange/" + cardToExchange.id()).with(csrf()))
                .andExpect(status().isOk());
    }


}