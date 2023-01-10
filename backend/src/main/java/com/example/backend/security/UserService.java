package com.example.backend.security;


import com.example.backend.service.IDService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserDetailsService {

    private final MongoUserRepo mongoUserRepo;

    private final IDService idService;

    private final Argon2EncoderService argon2EncoderService;

    public UserService(MongoUserRepo mongoUserRepo, IDService idService, Argon2EncoderService argon2EncoderService) {
        this.mongoUserRepo = mongoUserRepo;
        this.idService = idService;
        this.argon2EncoderService = argon2EncoderService;
    }

    public MongoUser addUser (MongoUserDTO user){
        String id = idService.generateID();

        MongoUser newUser = new MongoUser(id, user.username(), argon2EncoderService.encode(user.password()), user.email(), user.favorites());
        return mongoUserRepo.save(newUser);
    }




    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        MongoUser mongoUser = mongoUserRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found!!"));


        return new User(mongoUser.username(), mongoUser.password(), List.of());
    }
}
