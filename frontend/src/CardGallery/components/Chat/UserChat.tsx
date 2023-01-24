import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {ChatMessage, NewChatMessage} from "../../models/ChatMessage";

export default function UserChat(){

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [message, setMessage] = useState('');
    const [ws, setWs] = useState<WebSocket | null>(null);
    const { senderUsername, receiverUsername } = useParams<{ senderUsername: string, receiverUsername: string }>();

    console.log(messages);
    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:8080/api/ws/chat`);
        setWs(ws);

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(event);
            setMessages((prevMessages) => [...prevMessages, data]);
        };

        return () => {
            ws.close();
        };
    }, [senderUsername, receiverUsername]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (receiverUsername !== undefined) {

            const newChatMessage: NewChatMessage = {
                receiverUsername: receiverUsername,
                message,
            };
            if (ws) {
                ws.send(JSON.stringify(newChatMessage));
            }
            setMessage('');
        }
    };

    return (
        <div className="chat-page">
            <div className="chat-page-header">Chatting with {receiverUsername}</div>
            <div className="chat-page-messages">
                {messages.map((chatMessage) => (
                    <div className="chat-message" key={chatMessage.id}>
                        <div className="chat-message-username">{chatMessage.senderUsername}</div>
                        <div className="chat-message-text">{chatMessage.message}</div>
                        <div className="chat-message-timestamp">{chatMessage.timestamp.toString()}</div>
                    </div>
                ))}
            </div>
            <form className="chat-page-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}