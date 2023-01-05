package com.example.backend.security;

import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class UserServiceTest {

    MongoUserRepo mongoUserRepo = mock(MongoUserRepo.class);

    UserService userService =new UserService(mongoUserRepo);



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
        MongoUser expected = new MongoUser("123", "Frank", "ABC");
        String username = "Frank";

        // WHEN
        when(mongoUserRepo.findByUsername(username)).thenReturn(Optional.of(expected));
        UserDetails user = userService.loadUserByUsername(username);
        // THEN

        assertEquals(expected.username(),user.getUsername());
    }
}