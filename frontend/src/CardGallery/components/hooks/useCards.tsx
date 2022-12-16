import {useEffect, useState} from "react";
import axios from "axios/index";
import {Card} from "../../models/Card";

export default function useCards(){


    const [pokeCards, setPokeCards] = useState<Card[]>([])


    useEffect(() => {
        getAllCards()
    }, [])


    function getAllCards() {
        axios.get("/api/cards").then((response) => {
            setPokeCards(response.data)
        })
            .catch(e => console.error(e))
    }
    return{pokeCards}
}