import axios from "axios";
import {useState} from "react";
import {FavoriteCard} from "../../models/FavoriteCard";


export default function useFavorites(){

    const [favorites, setFavorites] = useState<FavoriteCard[]>([])

    function getFavoriteCards(){
        axios.get("/api/users/favorites").then((response)=>{
            setFavorites(response.data)
        })
            .catch(e => console.error(e))
    }

    return{favorites, getFavoriteCards}
}