import {useEffect, useState} from "react";
import {Card} from "../models/Card";
import axios from "axios";
import PokemonGallery from "./PokemonGallery";
import SearchBar from "./SearchBar";

export default function PokemonApp() {

    const [pokeCards, setPokeCards] = useState<Card[]>([])
    const [searchText, setSearchText] = useState<string>("")


    function handleSearchOnChange (searchText: string){
        setSearchText(searchText)
    }

    const filteredPokeCards = pokeCards.filter((pokeCard)=>
        pokeCard.id.toLowerCase().includes(searchText.toLowerCase()) ||
        pokeCard.name.toLowerCase().includes(searchText.toLowerCase())
    )













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
            <div>
                <SearchBar handleSearchText={handleSearchOnChange}/>
            </div>
            <PokemonGallery cards={filteredPokeCards}/>
        </div>
    )
}