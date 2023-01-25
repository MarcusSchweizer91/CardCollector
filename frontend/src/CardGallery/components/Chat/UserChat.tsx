import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {ChatMessage, NewChatMessage} from "../../models/ChatMessage";

import axios from "axios";
import {UserData} from "../../models/UserData";
import {Button, List, ListItem, ListItemText, TextField} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import "../css/UserChat.css";
import moment from "moment/moment";

type ChatOverviewProps = {
    user?: UserData
}

export default function UserChat(props: ChatOverviewProps) {

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [message, setMessage] = useState('');
    const [ws, setWs] = useState<WebSocket | null>(null);
    const {receiverUsername} = useParams<{ receiverUsername: string }>();


    console.log(messages);

    useEffect(() => {
        if (!props.user) return
        axios.get<ChatMessage[]>(`/api/chat/previous-messages?senderUsername=${props.user.username}&receiverUsername=${receiverUsername}`)
            .then((res) => {
                setMessages(res.data);
            })
            .catch((error) => console.log(error));

        const ws = new WebSocket(`ws://localhost:8080/api/ws/chat`);
        setWs(ws);

        ws.onmessage = (event) => {
            if (!props.user) return
            const data = JSON.parse(event.data);
            if (data.senderUsername === props.user.username && data.receiverUsername === receiverUsername) {
                setMessages((prevMessages) => [...prevMessages, data]);
            }
        };
        ws.onclose = () => {
            setMessages([]);
        };

        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, [props.user, receiverUsername]);


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (receiverUsername !== undefined && props.user && ws && ws.readyState === WebSocket.OPEN) {
            const senderUsername = props.user.username
            const newChatMessage: NewChatMessage = {
                senderUsername,
                receiverUsername,
                message
            };
            ws.send(JSON.stringify(newChatMessage));
            setMessage('');
        }
    };

    return (
        <div className="chat-page">
            <div className="chat-page-header">Chatting with {receiverUsername}</div>
            <List className={"chat-window"}>
                {messages.map((chatMessage) => (
                    <ListItem key={chatMessage.id}>
                        <ListItemText
                            secondary={<span className={"senderName"}>{chatMessage.senderUsername} - {moment(chatMessage.timestamp).format("HH:mm - DD.MMM.YYYY")}
                             </span>}
                            primary={<span className={"message"}>{chatMessage.message}</span>}
                        />


                    </ListItem>
                ))}
            </List>
            <form className="chat-page-form" onSubmit={handleSubmit}>
                <div className={"chatInput"}>
                    <TextField
                        type="text"
                        variant={"outlined"}
                        fullWidth
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        size={"small"}
                    />

                    <Button type={"submit"} variant="contained" endIcon={<SendIcon/>}>
                        Send
                    </Button>
                </div>
            </form>
        </div>
    );
}