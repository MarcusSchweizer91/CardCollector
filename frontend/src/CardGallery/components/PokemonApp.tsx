import {useState} from "react";
import PokemonGallery from "./PokemonGallery";
import SearchBar from "./SearchBar";
import useCards from "./hooks/useCards";

export default function PokemonApp() {

   const {pokeCards} = useCards()

    const [searchText, setSearchText] = useState<string>("")


    function handleSearchOnChange (searchText: string){
        setSearchText(searchText)
    }

    const filteredPokeCards = pokeCards.filter((pokeCard)=>
        pokeCard.id.toLowerCase().includes(searchText.toLowerCase()) ||
        pokeCard.name.toLowerCase().includes(searchText.toLowerCase())
    )





    return (
        <div>
            <div>
                <SearchBar handleSearchText={handleSearchOnChange}/>
            </div>
            <PokemonGallery cards={filteredPokeCards}/>
        </div>
    )
}