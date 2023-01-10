package com.example.backend.security;

import com.example.backend.service.IDService;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    MongoUserRepo mongoUserRepo = mock(MongoUserRepo.class);

    IDService idService = mock(IDService.class);

    Argon2EncoderService argon2EncoderService = mock(Argon2EncoderService.class);

    UserService userService =new UserService(mongoUserRepo, idService, argon2EncoderService);



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
        MongoUser expected = new MongoUser("123", "Frank", "ABC", "abc", Collections.emptyList());
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
                List.of("a","b"));

        // When
        when(idService.generateID()).thenReturn(id);
        when(argon2EncoderService.encode("123")).thenReturn("***");

        MongoUser expectedUser = new MongoUser(
                id,
                "Hans",
                "***",
                "test",
                List.of("a","b"));

        when(mongoUserRepo.save(expectedUser)).thenReturn(expectedUser);
        MongoUser returnedUser = userService.addUser(mongoUserDTO);

                //Then
        assertEquals(expectedUser, returnedUser);
        verify(idService, times(1)).generateID();
        verify(argon2EncoderService, times(1)).encode("123");
        verify(mongoUserRepo, times(1)).save(expectedUser);
    }
}