import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {UserData} from "../../models/UserData";

export default function ChatOverview() {
    const [users, setUsers] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get<UserData[]>('/api/users/all')
            .then((res) => {
                setUsers(res.data.map((user) => user.username))
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="users-list">
            {users.map((username) => (
                <div className="user" key={username} onClick={() => navigate(`/chat/${username}`)}>
                    {username}
                </div>
            ))}
        </div>
    );
}
