import {useState} from "react";
import PokemonGallery from "./PokemonGallery";
import SearchBar from "../SearchBar";
import useCards from "../hooks/useCards";
import "../css/PokemonApp.css"
import bg from "../../img/pokemon-pokemon-red-and-blue-blastoise-pokemon-bulbasaur-pokemon-wallpaper-preview.jpeg";


type PokemonAppProps = {

    isCardInFavorites: (cardId: string) => boolean
    addCardToFavorites(id: string): void
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
                <div className={"header-img"}>
                    <div className={"header"}>
                        <div className={"header-text"}>
                            <div className="  ">
                                <h1 className="card-title title">Welcome.</h1>
                                <h3 className="card-text pb-2 title">Discover the world of trading cards...</h3>
                            </div>
                        </div>
                        <img src={bg} className="card-img" alt="Background"/>
                        <SearchBar handleSearchText={handleSearchOnChange}/>
                    </div>
                    <PokemonGallery
                        removeCardFromFavorites={props.removeCardFromFavorites}
                        isCardInFavorites={props.isCardInFavorites}
                        addCardToFavorites={props.addCardToFavorites}
                        cards={filteredPokeCards}/>
                </div>

            </div>
        </div>
    )
}