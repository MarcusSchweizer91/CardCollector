import {useEffect, useState} from "react";
import {Card} from "../models/Card";
import axios from "axios";
import PokemonGallery from "./PokemonGallery";

export default function PokemonApp() {

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

    return (
        <div>
            <PokemonGallery cards={pokeCards}/>
        </div>
    )
}