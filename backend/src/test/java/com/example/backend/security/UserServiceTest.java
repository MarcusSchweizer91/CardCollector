package com.example.backend.security;

import com.example.backend.exceptions.CardAlreadySavedException;
import com.example.backend.models.FavoriteCard;
import com.example.backend.models.MongoUser;
import com.example.backend.models.MongoUserDTO;
import com.example.backend.repo.CardRepo;
import com.example.backend.service.IDService;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    MongoUserRepo mongoUserRepo = mock(MongoUserRepo.class);

    IDService idService = mock(IDService.class);

    Argon2EncoderService argon2EncoderService = mock(Argon2EncoderService.class);

    CardRepo cardRepo = mock(CardRepo.class);

    UserService userService =new UserService(mongoUserRepo, cardRepo, idService, argon2EncoderService);



    @Test
    void loadUserByUsernameExpectUsernameNotFound() {

        // GIVEN

        String username = "Frank";


        // THEN
        when(mongoUserRepo.findByUsername(username)).thenReturn(Optional.empty());

        // WHEN
        assertThrows(UsernameNotFoundException.class,()->userService.loadUserByUsername(username));
    }

    @Test
    void loadUserByUsernameExpectUsername(){

        // GIVEN
        MongoUser expected = new MongoUser("123", "Frank", "ABC", "abc", Collections.emptySet());
        String username = "Frank";

        // WHEN
        when(mongoUserRepo.findByUsername(username)).thenReturn(Optional.of(expected));
        UserDetails user = userService.loadUserByUsername(username);
        // THEN

        assertEquals(expected.username(),user.getUsername());
    }

    @Test
    void registerUser(){
        //Given
        String id = "1234";

        MongoUserDTO mongoUserDTO = new MongoUserDTO(
                "Hans",
                "123",
                "test",
                Collections.emptySet());

        // When
        when(idService.generateID()).thenReturn(id);
        when(argon2EncoderService.encode("123")).thenReturn("***");

        MongoUser expectedUser = new MongoUser(
                id,
                "Hans",
                "***",
                "test",
                Collections.emptySet());

        when(mongoUserRepo.save(expectedUser)).thenReturn(expectedUser);
        MongoUser returnedUser = userService.addUser(mongoUserDTO);

                //Then
        assertEquals(expectedUser, returnedUser);
        verify(idService, times(1)).generateID();
        verify(argon2EncoderService, times(1)).encode("123");
        verify(mongoUserRepo, times(1)).save(expectedUser);
    }

    @Test
    void addFavorites() {
        String cardId = "123";
        FavoriteCard newFavCard = new FavoriteCard(cardId);

        MongoUser user = new MongoUser("123","username","password","Max", new HashSet<>());

        Set<FavoriteCard> newList = new HashSet<>();

        newList.add(newFavCard);

        when(mongoUserRepo.findByUsername("username")).thenReturn(Optional.of(user));

        Set<FavoriteCard> result = userService.addFavorites("username",cardId);

        assertEquals(result, newList);
    }

    @Test
    void addFavorites_cardAlreadySaved_throwsCardAlreadySavedException() {
        // Given
        String username = "testuser";
        String cardId = "123";
        MongoUser user = new MongoUser("1", username, "password", "email@example.com", Set.of(new FavoriteCard(cardId)));
        when(mongoUserRepo.findByUsername(username)).thenReturn(Optional.of(user));

        // When & Then
        assertThrows(CardAlreadySavedException.class, () -> userService.addFavorites(username, cardId));
    }



}