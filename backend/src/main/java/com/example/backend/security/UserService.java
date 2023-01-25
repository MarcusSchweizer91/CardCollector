package com.example.backend.security;


import com.example.backend.exceptions.CardAlreadySavedException;
import com.example.backend.models.PokeCard;
import com.example.backend.models.FavoriteCard;
import com.example.backend.models.MongoUser;
import com.example.backend.models.MongoUserDTO;
import com.example.backend.repo.CardRepo;
import com.example.backend.service.IDService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
public class UserService implements UserDetailsService {

    private final MongoUserRepo mongoUserRepo;

    private final CardRepo cardRepo;

    private final IDService idService;

    private final Argon2EncoderService argon2EncoderService;

    public UserService(MongoUserRepo mongoUserRepo, CardRepo cardRepo, IDService idService, Argon2EncoderService argon2EncoderService) {
        this.mongoUserRepo = mongoUserRepo;
        this.cardRepo = cardRepo;
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

    public Set<FavoriteCard> addFavorites(String username, String cardId){
        MongoUser user = mongoUserRepo.findByUsername(username).orElseThrow();
        Set<FavoriteCard> cardList = user.favorites();
        for (FavoriteCard card : cardList){
            if (card.id().equals(cardId)){
                throw new CardAlreadySavedException("Card already saved!");
            }
        }
        FavoriteCard newFavCard = new FavoriteCard(cardId);

        cardList.add(newFavCard);
        mongoUserRepo.save(user);
        return cardList;
    }

    public List<PokeCard> getFavoriteCards (String username){
        Set<FavoriteCard> list = mongoUserRepo.findByUsername(username).orElseThrow().favorites();

        List<PokeCard> cardList = new ArrayList<>();

        for (FavoriteCard favCard: list){
            PokeCard card = cardRepo.findById(favCard.id()).orElseThrow();
            cardList.add(card);
        }
        return cardList;
    }


    public MongoUser getUserByLogin (){
        Optional<MongoUser> userBySecurity = mongoUserRepo.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());

        return userBySecurity.flatMap(user -> userBySecurity)
                .orElse(new MongoUser("","unknownUser","","", Collections.emptySet()));

    }

    public void removeCardFromFavorites(String cardId, String username) {
        MongoUser user = mongoUserRepo.findByUsername(username).orElseThrow();
        Set<FavoriteCard> favorites = user.favorites();
        Optional<FavoriteCard> cardToRemove = favorites.stream()
                .filter(card -> card.id().equals(cardId))
                .findFirst();
        cardToRemove.ifPresent(favorites::remove);
        mongoUserRepo.save(user);
    }


    public List<String> getAllUsernames() {

        return mongoUserRepo.findAll().stream()
                .map(MongoUser::username)
                .toList();
    }



    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        MongoUser mongoUser = mongoUserRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found!!"));


        return new User(mongoUser.username(), mongoUser.password(), List.of());
    }
}
