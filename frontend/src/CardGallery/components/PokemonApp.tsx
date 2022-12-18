import {useState} from "react";
import PokemonGallery from "./PokemonGallery";
import SearchBar from "./SearchBar";
import useCards from "./hooks/useCards";
import NavBar from "./NavBar";
import {BrowserRouter, Route, Routes} from "react-router-dom";

export default function PokemonApp() {

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
                <BrowserRouter>
                    <NavBar/>
                    <SearchBar handleSearchText={handleSearchOnChange}/>
                    <Routes>
                        <Route path={"/"} element={<PokemonGallery cards={filteredPokeCards}/>}></Route>
                        <Route path={"/exchange"} element={<PokemonGallery cards={filteredPokeCards}/>}></Route>
                        <Route path={"/user"} element={<PokemonGallery cards={filteredPokeCards}/>}></Route>

                    </Routes>
                </BrowserRouter>


            </div>

        </div>
    )
}