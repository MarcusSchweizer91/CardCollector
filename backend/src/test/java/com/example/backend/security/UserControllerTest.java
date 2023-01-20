package com.example.backend.security;

import com.example.backend.models.*;
import com.example.backend.repo.CardRepo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;


import java.util.Collections;
import java.util.HashSet;


import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    MongoUserRepo mongoUserRepo;

    @Autowired
    CardRepo cardRepo;


    @Test
    @DirtiesContext
    @WithMockUser
    void helloMe() throws Exception {
        mockMvc.perform(get("/api/users/me"))
                .andExpect(status().isOk())
        ;

    }

    @Test
    @DirtiesContext
    void helloMe_expect_unknownUser() throws Exception {
        mockMvc.perform(get("/api/users/me"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                                    {"id":"",
                                    "username":"unknownUser",
                                    "password": "",
                                    "email": "",
                                    "favorites": []}
                        """));

    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "Frank")
    void login() throws Exception {
        mockMvc.perform(post("/api/users/login").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string("Frank"));

    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "Frank")
    void logout() throws Exception {
        mockMvc.perform(post("/api/users/logout").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string("unknownUser"));

    }

    @Test
    @DirtiesContext
    void register() throws Exception {

        MongoUserDTO mongoUserDTO = new MongoUserDTO("Ulf", "123", "abc", Collections.emptySet());

        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(mongoUserDTO);

        mockMvc.perform(post("/api/users/register").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk());


    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "Marcus")
    void addFavorites() throws Exception {
        MongoUser user1 = new MongoUser("123", "Marcus", "password", "firstname",
                new HashSet<>());
        mongoUserRepo.save(user1);


        cardRepo.save(new Card("321", "Pikachu", "123", Collections.emptyList(), new Image("url")));

        mockMvc.perform(put("/api/users/favorites/321")
                        .with(csrf()))

                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                [{
                                "id": "321"
                                }]
                                """
                ));
    }
}