package com.example.backend.service;

import com.example.backend.models.ChatMessage;
import com.example.backend.repo.ChatRepo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;


import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
@ExtendWith(MockitoExtension.class)
class ChatServiceTest {
    @Mock
    ChatRepo chatRepo;
    @Mock
    ObjectMapper objectMapper;
    @Mock
    WebSocketSession session;
    @InjectMocks
    ChatService chatService;

    @Captor
    private ArgumentCaptor<TextMessage> textMessageCaptor;

    @BeforeEach
    public void setUp() {
        chatService = new ChatService(chatRepo, objectMapper);
    }

    @Test
    void getSessions() {

        ChatService spyChatService = spy(new ChatService(chatRepo, objectMapper));
        Set<WebSocketSession> expectedSessions = new HashSet<>();
        doReturn(expectedSessions).when(spyChatService).getSessions();


        Set<WebSocketSession> actualSessions = spyChatService.getSessions();


        assertEquals(expectedSessions, actualSessions);
    }

    @Test
    void saveMessage() {
        // Arrange
        ChatMessage expectedMessage = new ChatMessage("id", "sender", "receiver", "message", LocalDateTime.now());
        when(chatRepo.save(expectedMessage)).thenReturn(expectedMessage);

        // Act
        ChatMessage actualMessage = chatService.saveMessage(expectedMessage);

        // Assert
        assertEquals(expectedMessage, actualMessage);
    }


    @Test
    void sendPreviousMessagesTest() throws Exception {
        List<ChatMessage> messages = Arrays.asList(
                ChatMessage.builder()
                        .senderUsername("sender")
                        .receiverUsername("receiver")
                        .message("Hello")
                        .timestamp(LocalDateTime.now())
                        .build(),
                ChatMessage.builder()
                        .senderUsername("receiver")
                        .receiverUsername("sender")
                        .message("Hi")
                        .timestamp(LocalDateTime.now())
                        .build()
        );
        lenient().when(session.getPrincipal()).thenReturn(() -> "sender");
        when(objectMapper.writeValueAsString(messages.get(0))).thenReturn("{\"sender\":\"sender\",\"receiver\":\"receiver\",\"message\":\"Hello\",\"timestamp\":\"" + messages.get(0).getTimestamp() + "\"}");
        when(objectMapper.writeValueAsString(messages.get(1))).thenReturn("{\"sender\":\"receiver\",\"receiver\":\"sender\",\"message\":\"Hi\",\"timestamp\":\"" + messages.get(1).getTimestamp() + "\"}");
        when(chatRepo.findAllBySenderUsernameAndReceiverUsername("sender", "receiver"))
                .thenReturn(messages);
        chatService.sendPreviousMessages(session, "sender", "receiver");
        ArgumentCaptor<TextMessage> textMessageArgumentCaptor = ArgumentCaptor.forClass(TextMessage.class);
        verify(session, times(2)).sendMessage(textMessageArgumentCaptor.capture());
        List<TextMessage> capturedTextMessages = textMessageArgumentCaptor.getAllValues();

        assertEquals("{\"sender\":\"sender\",\"receiver\":\"receiver\",\"message\":\"Hello\",\"timestamp\":\"" + messages.get(0).getTimestamp() + "\"}", capturedTextMessages.get(0).getPayload());
        assertEquals("{\"sender\":\"receiver\",\"receiver\":\"sender\",\"message\":\"Hi\",\"timestamp\":\"" + messages.get(1).getTimestamp() + "\"}", capturedTextMessages.get(1).getPayload());
        verify(chatRepo).findAllBySenderUsernameAndReceiverUsername("sender", "receiver");
        verify(chatRepo).findAllBySenderUsernameAndReceiverUsername("receiver", "sender");
        verifyNoMoreInteractions(session, chatRepo, objectMapper);
    }

    @Test
    void afterConnectionEstablished_shouldSendPreviousMessages() throws Exception {

        ChatService chatServiceSpy = spy(chatService);
        when(session.getPrincipal()).thenReturn(() -> "sender");
        ChatMessage lastChatMessage = ChatMessage.builder()
                .senderUsername("sender")
                .receiverUsername("receiver")
                .message("Hello")
                .timestamp(LocalDateTime.now())
                .build();
        when(chatRepo.findFirstBySenderUsernameOrderByTimestampDesc("sender")).thenReturn(lastChatMessage);

        chatServiceSpy.afterConnectionEstablished(session);

        verify(chatRepo, times(1)).findFirstBySenderUsernameOrderByTimestampDesc("sender");
        verify(chatServiceSpy, times(1)).sendPreviousMessages(session, "sender", "receiver");
    }






    @Test
    void handleTextMessage_shouldSendMessageToReceiver() throws Exception {

        ChatMessage chatMessage = ChatMessage.builder()
                .senderUsername("sender")
                .receiverUsername("receiver")
                .message("Hello")
                .timestamp(LocalDateTime.now())
                .build();
        when(objectMapper.readValue(anyString(), eq(ChatMessage.class))).thenReturn(chatMessage);
        when(session.getPrincipal()).thenReturn(() -> "sender");
        when(objectMapper.writeValueAsString(chatMessage)).thenReturn("{\"senderUsername\":\"sender\",\"receiverUsername\":\"receiver\",\"message\":\"Hello\",\"timestamp\":\"2022-01-23T10:15:30\"}");

        chatService.handleTextMessage(session, new TextMessage("{\"senderUsername\":\"sender\",\"receiverUsername\":\"receiver\",\"message\":\"Hello\",\"timestamp\":\"2022-01-23T10:15:30\"}"));


        verify(session, times(1)).sendMessage(textMessageCaptor.capture());
        TextMessage sentTextMessage = textMessageCaptor.getValue();
        assertEquals("{\"senderUsername\":\"sender\",\"receiverUsername\":\"receiver\",\"message\":\"Hello\",\"timestamp\":\"2022-01-23T10:15:30\"}", sentTextMessage.getPayload());
    }

    @Test
    void handleTextMessage_shouldSaveMessageInRepo() throws Exception {

        ChatMessage chatMessage = ChatMessage.builder()
                .senderUsername("sender")
                .receiverUsername("receiver")
                .message("Hello")
                .timestamp(LocalDateTime.now())
                .build();
        when(objectMapper.readValue(anyString(), eq(ChatMessage.class))).thenReturn(chatMessage);
        when(session.getPrincipal()).thenReturn(() -> "sender");
        when(objectMapper.writeValueAsString(chatMessage)).thenReturn("{\"senderUsername\":\"sender\",\"receiverUsername\":\"receiver\",\"message\":\"Hello\",\"timestamp\":\"2022-01-23T10:15:30\"}");


        chatService.handleTextMessage(session, new TextMessage("{\"senderUsername\":\"sender\",\"receiverUsername\":\"receiver\",\"message\":\"Hello\",\"timestamp\":\"2022-01-23T10:15:30\"}"));


        verify(chatRepo, times(1)).save(chatMessage);
    }

    @Test
    void handleTextMessage_shouldSetId() throws Exception {

        ChatMessage chatMessage = ChatMessage.builder()
                .senderUsername("sender")
                .receiverUsername("receiver")
                .message("Hello")
                .timestamp(LocalDateTime.now())
                .build();
        when(objectMapper.readValue(anyString(), eq(ChatMessage.class))).thenReturn(chatMessage);
        when(session.getPrincipal()).thenReturn(() -> "sender");
        when(objectMapper.writeValueAsString(chatMessage)).thenReturn("{\"senderUsername\":\"sender\",\"receiverUsername\":\"receiver\",\"message\":\"Hello\",\"timestamp\":\"2022-01-23T10:15:30\"}");

        chatService.handleTextMessage(session, new TextMessage("{\"senderUsername\":\"sender\",\"receiverUsername\":\"receiver\",\"message\":\"Hello\",\"timestamp\":\"2022-01-23T10:15:30\"}"));


        assertEquals(String.class, chatMessage.getId().getClass());
    }

    @Test
    void afterConnectionEstablished_shouldAddSessionToSessions() throws Exception {

        when(session.getPrincipal()).thenReturn(() -> "sender");
        ChatMessage lastChatMessage = ChatMessage.builder()
                .senderUsername("sender")
                .receiverUsername("receiver")
                .message("Hello")
                .timestamp(LocalDateTime.now())
                .build();
        when(chatRepo.findFirstBySenderUsernameOrderByTimestampDesc("sender")).thenReturn(lastChatMessage);

        chatService.afterConnectionEstablished(session);

        assertTrue(chatService.getSessions().contains(session));
    }

    @Test
    void afterConnectionClosed_shouldRemoveSessionFromSessions() throws Exception {

        WebSocketSession session = mock(WebSocketSession.class);
        CloseStatus status = new CloseStatus(1000, "reason");
        chatService.getSessions().add(session);

        chatService.afterConnectionClosed(session, status);

        assertFalse(chatService.getSessions().contains(session));
    }





}