import { useEffect, useState } from "react";
import axios from "axios";


function useAuthCheck() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        axios.get("api/users/me")
            .then(response => {
                if (response.data && response.data.username !== "unknownUser") {
                    setIsLoggedIn(true);
                }
            });
    }, []);
    return isLoggedIn;
}

export default useAuthCheck;
