package com.example.backend.service;

import com.example.backend.models.ChatMessage;
import com.example.backend.repo.ChatRepo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class ChatService extends TextWebSocketHandler {

    private final ChatRepo chatRepo;
    private final ObjectMapper objectMapper;
    private final Set<WebSocketSession> session = new HashSet<>();

    public ChatService(ChatRepo chatRepo, ObjectMapper objectMapper) {
        this.chatRepo = chatRepo;
        this.objectMapper = objectMapper;
    }

    public Set<WebSocketSession> getSession(){
        return session;
    }

    public ChatMessage saveMessage (ChatMessage message){
        return chatRepo.save(message);
    }

    public void sendPreviousMessages(WebSocketSession session, String senderUsername, String receiverUsername) throws IOException {
        List<ChatMessage> messages = chatRepo.findAllBySenderUsernameAndReceiverUsername(senderUsername, receiverUsername);
        messages.addAll(chatRepo.findAllBySenderUsernameAndReceiverUsername(receiverUsername, senderUsername));
        messages.sort(Comparator.comparing(ChatMessage::getTimestamp));
        for (ChatMessage message : messages) {
            try {
                session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message)));
            } catch (Exception e) {
                session.sendMessage(new TextMessage("An error occurred while processing."));
            }
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        super.afterConnectionEstablished(session);
        this.session.add(session);

        String senderUsername = Objects.requireNonNull(session.getPrincipal()).getName();
        ChatMessage lastChatMessage = chatRepo.findFirstBySenderUsernameOrderByTimestampDesc(senderUsername);
        if (lastChatMessage != null) {
            sendPreviousMessages(session, senderUsername, lastChatMessage.getReceiverUsername());
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        super.handleTextMessage(session, message);

        ChatMessage chatMessage = objectMapper.readValue(message.getPayload(), ChatMessage.class);

        chatMessage.setSenderUsername(Objects.requireNonNull(session.getPrincipal()).getName());
        chatMessage.setTimestamp(LocalDateTime.now());
        chatMessage.setId(UUID.randomUUID().toString());

        TextMessage textMessage = new TextMessage(objectMapper.writeValueAsString(chatMessage));

        for (WebSocketSession sessionFromSessions : this.session) {
            if (sessionFromSessions.getPrincipal() != null && Objects.requireNonNull(sessionFromSessions.getPrincipal()).getName().equals(chatMessage.getReceiverUsername())) {
                try {
                    sessionFromSessions.sendMessage(textMessage);

                } catch (Exception e) {
                    session.sendMessage(new TextMessage("An error occurred while processing."));
                }
            }
        }
        session.sendMessage(textMessage);
        saveMessage(chatMessage);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        super.afterConnectionClosed(session, status);
        this.session.remove(session);
    }

}
