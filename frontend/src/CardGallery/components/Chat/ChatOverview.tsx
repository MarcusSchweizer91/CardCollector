import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {UserData} from "../../models/UserData";
import "../css/ChatOverview.css"
import {Paper} from "@mui/material";


type ChatOverviewProps = {
    user?: UserData
}

export default function ChatOverview(props: ChatOverviewProps) {
    const [users, setUsers] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get<string[]>('/api/users/all')
            .then((res) => {
                setUsers(res.data.map((user) => user))
            })
            .catch((error) => console.log(error));
    }, []);


    const filteredUsers = users.filter((username) => username !== props.user?.username);

    const mapUsers = filteredUsers.map((username) => (

        <Paper className={"paper"}>
            <div className="user" key={username} onClick={() => navigate(`/chat/${username}`)}>
                {username}
            </div>
        </Paper>

    ));


    return (
        <div >
            <div className="chat-page-header">Chat rooms</div>

            <div className="users-list">
                {mapUsers}
            </div>

        </div>
    );
}
