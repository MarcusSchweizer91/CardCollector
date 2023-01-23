import {useEffect, useState} from "react";
import axios from "axios";
import {PokeCard} from "../../models/PokeCard";

export default function useCards(){


    const [pokeCards, setPokeCards] = useState<PokeCard[]>([])


    useEffect(() => {
        getAllCards()
    }, [])


    function getAllCards() {
        axios.get("/api/cards").then((response) => {
            const filteredData = response.data.filter(Boolean);
            setPokeCards(filteredData);
        })
            .catch(e => console.error(e))
    }



    return{pokeCards}
}