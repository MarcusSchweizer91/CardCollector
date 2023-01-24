import ExchangeGallery from "./Exchange Gallery";
import {CardToExchange} from "../../models/CardToExchange";
import axios from "axios";
import {useEffect, useState} from "react";
import ExchangeForm from "./ExchangeForm";
import SearchBar from "../SearchBar";

export default function ExchangeApp() {

    const [exchangeCards, setExchangeCards] = useState<CardToExchange[]>([])
    const [searchText, setSearchText] = useState<string>("")


    function handleSearchTextOnChange(searchText: string) {
        setSearchText(searchText)
    }

    const filteredExchangeCards = exchangeCards.filter((exchangeCard) =>
        exchangeCard.name.toLowerCase().includes(searchText.toLowerCase()))

    useEffect(() => {
        getExchangeCards()
    }, [])

    function getExchangeCards() {
        axios.get("/api/exchange").then((response) => {
            setExchangeCards(response.data)
        })
            .catch(e => console.error(e))
    }

    const addExchangeCard = (newCard: CardToExchange, ) => {
        let formData = new FormData();
        if (newCard.image){
            formData.append("file", newCard.image[0]);
        }

        formData.append("entry", JSON.stringify(newCard))

        axios.post("/api/exchange", formData)
            .then(getExchangeCards)
            .catch(e => console.error(e))

    }


    function deleteEntries(id?: string) {
        axios.delete("/api/exchange/" + id)
            .then(() => {
                setExchangeCards(prevState => {
                    return prevState.filter((exchangeCard) => exchangeCard.id !== id)
                })
            })
    }

    function editEntry(newEdit: CardToExchange){
        axios.put("/api/exchange/" + newEdit.id, newEdit)
            .then(getExchangeCards)

    }
    return (
        <div>
            <ExchangeForm addEntry={addExchangeCard}/>
            <SearchBar handleSearchText={handleSearchTextOnChange}/>
            <ExchangeGallery editEntry={editEntry}  entries={filteredExchangeCards} deleteEntry={deleteEntries}/>

        </div>
    )
}