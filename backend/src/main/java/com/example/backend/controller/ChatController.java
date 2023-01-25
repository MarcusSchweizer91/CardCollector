package com.example.backend.controller;

import com.example.backend.models.ChatMessage;
import com.example.backend.service.ChatService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping("/previous-messages")
    public List<ChatMessage> getPreviousMessages(@RequestParam("senderUsername") String senderUsername, @RequestParam("receiverUsername")String receiverUsername){
        return chatService.getPreviousMessages(senderUsername,receiverUsername);
    }
}
