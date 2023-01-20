package com.example.backend.security;


import com.example.backend.models.FavoriteCard;
import com.example.backend.models.MongoUser;
import com.example.backend.models.MongoUserDTO;
import com.example.backend.service.IDService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

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
        mongoUserRepo.save(newUser);

        return new MongoUser(
                newUser.id(),
                newUser.username(),
                "***",
                newUser.email(),
                newUser.favorites()
        );
    }

    public List<FavoriteCard> addFavorites(String username, String cardId){
        MongoUser user = mongoUserRepo.findByUsername(username).orElseThrow();
        List<FavoriteCard> cardList = user.favorites();
        FavoriteCard newFavCard = new FavoriteCard(cardId);

        cardList.add(newFavCard);
        mongoUserRepo.save(user);
        return cardList;
    }


    public MongoUser getUserByLogin (){
        Optional<MongoUser> userBySecurity = mongoUserRepo.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());

        return userBySecurity.flatMap(user -> userBySecurity)
                .orElse(new MongoUser("","unknownUser","","", Collections.emptyList()));

    }




    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        MongoUser mongoUser = mongoUserRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found!!"));


        return new User(mongoUser.username(), mongoUser.password(), List.of());
    }
}
