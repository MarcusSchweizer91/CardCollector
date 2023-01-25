package com.example.backend.controller;

import com.example.backend.models.ChatMessage;
import com.example.backend.service.ChatService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ChatControllerTest {

    @Mock
    private ChatService chatService;

    @InjectMocks
    private ChatController chatController;

    @Test
    void getPreviousMessages_shouldCallChatServiceWithCorrectParameters() {

        String senderUsername = "sender1";
        String receiverUsername = "receiver1";
        ChatMessage message1 = ChatMessage.builder().id("1").senderUsername(senderUsername).receiverUsername(receiverUsername).message("message1").timestamp(LocalDateTime.of(2020, 1, 1, 0, 0, 0)).build();
        ChatMessage message2 = ChatMessage.builder().id("2").senderUsername(receiverUsername).receiverUsername(senderUsername).message("message2").timestamp(LocalDateTime.of(2021, 1, 2, 0, 9, 0)).build();
        List<ChatMessage> previousMessages = Arrays.asList(message1, message2);
        when(chatService.getPreviousMessages(senderUsername, receiverUsername)).thenReturn(previousMessages);

        List<ChatMessage> result = chatController.getPreviousMessages(senderUsername, receiverUsername);

        verify(chatService).getPreviousMessages(senderUsername, receiverUsername);
        assertEquals(previousMessages, result);
    }
}

