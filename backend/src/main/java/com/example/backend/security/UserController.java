package com.example.backend.security;



import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;



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





}
