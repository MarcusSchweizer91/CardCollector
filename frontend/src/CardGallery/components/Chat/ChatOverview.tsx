import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {UserData} from "../../models/UserData";
import "../css/ChatOverview.css"
import {Button, Card,  Stack} from "@mui/material";


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
        <Stack key={username}>
            <Button sx={{m:2}} variant={"outlined"}>
                <div className="user" key={username} onClick={() => navigate(`/chat/${username}`)}>
                    {username}
                </div>
            </Button>
        </Stack>

    ));


    return (
        <div>
            <div><h2>Chat rooms</h2></div>

            <Card className={"paper"} variant={"outlined"} sx={{my:'3rem', mx:'25%'}}>
                <div className="users-list">
                    {mapUsers}
                </div>
            </Card>

        </div>
    );
}
