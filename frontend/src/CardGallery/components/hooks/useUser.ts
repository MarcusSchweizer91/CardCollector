import {useEffect, useState} from "react";
import axios from "axios";

export default function useUser() {

    const [username, setUsername] = useState<string>();

    useEffect(()=>{
        axios.get("api/users/me")
            .then(response => response.data)
            .then(data => setUsername(data))
    },[])

    function logout(){
        return axios.post("/api/users/logout")
            .then(response => response.data)
            .then((data)=>{
                setUsername(data)
                return data
            })
    }

    function login(username: string, password: string) {
        return axios.post("api/users/login", undefined, {
            auth: {
                username,
                password
            }
        })
            .then((response) => response.data)
            .then(data=>{
                setUsername(data)
                return data
            })
    }

    function register(username: string, password: string, email: string){
        axios.post("/api/users/register", {
            username: username,
            password: password,
            email: email,
            favorites: []
        }).catch(e => console.error(e));
    }

    return{username, login, logout, register}
}