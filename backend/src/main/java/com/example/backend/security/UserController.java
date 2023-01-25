package com.example.backend.security;



import com.example.backend.models.PokeCard;
import com.example.backend.models.FavoriteCard;
import com.example.backend.models.MongoUser;
import com.example.backend.models.MongoUserDTO;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.security.Principal;

import java.util.List;
import java.util.Set;


@RestController
@RequestMapping("api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public MongoUser helloMe(){
        return userService.getUserByLogin();
    }



    @PostMapping("/login")
    public String login(){
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @PostMapping("/logout")
    public String logout(HttpSession httpSession){
        httpSession.invalidate();
        SecurityContextHolder.clearContext();
        return "unknownUser";
    }

    @PostMapping ("/register")
    public MongoUser addUser (@RequestBody MongoUserDTO mongoUserDTO){
        return userService.addUser(mongoUserDTO);
    }


    @PutMapping("/favorites/{cardId}")
    public Set<FavoriteCard> addFavoriteCard (Principal principal, @PathVariable String cardId){
        return userService.addFavorites(principal.getName(), cardId);
    }

    @GetMapping("/favorites")
    public List<PokeCard> getFavoriteCards (Principal principal){
        return userService.getFavoriteCards(principal.getName());
    }

    @DeleteMapping("/favorites/{cardId}")
    public void removeCardFromFavorites(Principal principal, @PathVariable String cardId) {
        userService.removeCardFromFavorites(cardId, principal.getName());
    }

    @GetMapping("/all")
    public List<String> getAllUsernames(){
        return userService.getAllUsernames();
    }








}
