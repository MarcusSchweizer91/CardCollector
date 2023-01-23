import {useState} from "react";
import PokemonGallery from "./PokemonGallery";
import SearchBar from "../SearchBar";
import useCards from "../hooks/useCards";


type PokemonAppProps = {

    isCardInFavorites:(cardId: string) => boolean
    addCardToFavorites(id:string):void
    removeCardFromFavorites: (cardId: string) => Promise<void>
}
export default function PokemonApp(props: PokemonAppProps) {

    const {pokeCards} = useCards()
    const [searchText, setSearchText] = useState<string>("")


    function handleSearchOnChange(searchText: string) {
        setSearchText(searchText)
    }

    const filteredPokeCards = pokeCards.filter((pokeCard) =>
        pokeCard.id.toLowerCase().includes(searchText.toLowerCase()) ||
        pokeCard.name.toLowerCase().includes(searchText.toLowerCase())
    )


    return (
        <div>
            <div>
                <SearchBar handleSearchText={handleSearchOnChange}/>
                <PokemonGallery
                                removeCardFromFavorites={props.removeCardFromFavorites}
                                isCardInFavorites={props.isCardInFavorites}
                                addCardToFavorites={props.addCardToFavorites}
                                cards={filteredPokeCards}/>
            </div>

        </div>
    )
}