import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {UserData} from "../../models/UserData";

type ChatOverviewProps={
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
        <div className="user" key={username} onClick={() => navigate(`/chat/${username}`)}>
            {username}
        </div>
    ));


    return (
        <div className="users-list">

                {mapUsers}


        </div>
    );
}
