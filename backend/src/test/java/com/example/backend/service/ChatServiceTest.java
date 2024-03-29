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
        doReturn(expectedSessions).when(spyChatService).getSession();


        Set<WebSocketSession> actualSessions = spyChatService.getSession();


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
    void afterConnectionEstablished_shouldSendPreviousMessages() throws Exception {

        ChatService chatServiceSpy = spy(chatService);
        when(session.getPrincipal()).thenReturn(() -> "sender");

        when(chatRepo.findAllBySenderUsernameAndReceiverUsername("sender", "receiver")).thenReturn(Collections.emptyList());

        chatServiceSpy.afterConnectionEstablished(session);

        verify(chatRepo, times(1)).findAllBySenderUsernameAndReceiverUsername("sender", "receiver");
        verify(chatServiceSpy, times(1)).getPreviousMessages("sender", "receiver");
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

        when(chatRepo.findAllBySenderUsernameAndReceiverUsername("sender", "receiver")).thenReturn(Collections.emptyList());

        chatService.afterConnectionEstablished(session);

        assertTrue(chatService.getSession().contains(session));
    }

    @Test
    void afterConnectionClosed_shouldRemoveSessionFromSessions() throws Exception {

        WebSocketSession session = mock(WebSocketSession.class);
        CloseStatus status = new CloseStatus(1000, "reason");
        chatService.getSession().add(session);

        chatService.afterConnectionClosed(session, status);

        assertFalse(chatService.getSession().contains(session));
    }



    @Test
    void testForLoopAndSendMessageSuccess() throws Exception {

        ChatMessage chatMessage = new ChatMessage("id", "Marcus", "receiver", "message", LocalDateTime.now());
        System.out.println(objectMapper.writeValueAsString(chatMessage));
        when(session.getPrincipal()).thenReturn(() -> "Marcus");


        TextMessage textMessage = new TextMessage("""
                {
                "id":"id",
                "senderUsername":"Marcus",
                "receiverUsername:"receiver",
                "message":"message",
                "timestamp":
                }
                """);
        when(objectMapper.readValue(textMessage.getPayload(), ChatMessage.class)).thenReturn(chatMessage);

        when(objectMapper.writeValueAsString(chatMessage)).thenReturn("""
                {
                "id":"id",
                "senderUsername":"Marcus",
                "receiverUsername:"receiver",
                "message":"message",
                "timestamp":
                }
                """);
        WebSocketSession receiverSession = mock(WebSocketSession.class);
        when(receiverSession.getPrincipal()).thenReturn(() -> "receiver");
        chatService.getSession().add(receiverSession);
        chatService.handleTextMessage(session, textMessage);

        verify(receiverSession).sendMessage(textMessage);
    }

    @Test
    void getPreviousMessages_shouldReturnSortedListOfPreviousMessages() {

        ChatMessage message1 = ChatMessage.builder().id("1").senderUsername("sender1").receiverUsername("receiver1").message("message1").timestamp(LocalDateTime.of(2020, 1, 1, 0, 0, 0)).build();
        ChatMessage message2 = ChatMessage.builder().id("2").senderUsername("receiver1").receiverUsername("sender1").message("message2").timestamp(LocalDateTime.of(2021, 1, 2, 0, 9, 0)).build();
        List<ChatMessage> messageList = new ArrayList<>(Arrays.asList(message1, message2));
        when(chatRepo.findAllBySenderUsernameAndReceiverUsername(anyString(), anyString())).thenReturn(messageList);

        List<ChatMessage> previousMessages = chatService.getPreviousMessages("sender1", "receiver1");

        assertEquals(4, previousMessages.size());
        assertTrue(previousMessages.get(0).getTimestamp().isBefore(previousMessages.get(previousMessages.size()-1).getTimestamp()));
        verify(chatRepo).findAllBySenderUsernameAndReceiverUsername("sender1", "receiver1");
        verify(chatRepo).findAllBySenderUsernameAndReceiverUsername("receiver1", "sender1");
    }


}