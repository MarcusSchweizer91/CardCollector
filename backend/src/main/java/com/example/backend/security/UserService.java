package com.example.backend.security;


import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserDetailsService {

    private final MongoUserRepo mongoUserRepo;

    public UserService(MongoUserRepo mongoUserRepo) {
        this.mongoUserRepo = mongoUserRepo;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        MongoUser mongoUser = mongoUserRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found!!"));


        return new User(mongoUser.username(), mongoUser.password(), List.of());
    }
}
