import ExchangeGallery from "./Exchange Gallery";
import {CardToExchange} from "../../models/CardToExchange";
import axios from "axios";
import {useEffect, useState} from "react";
import ExchangeForm from "./ExchangeForm";
import SearchBar from "../SearchBar";
import {Card} from "@mui/material";

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

    const addExchangeCard = (newCard: CardToExchange,) => {
        let formData = new FormData();
        if (newCard.image) {
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

    function editEntry(newEdit: CardToExchange) {
        let formData = new FormData();
        if (newEdit.image) {
            formData.append("file", newEdit.image[0]);
        }
        formData.append("entry", JSON.stringify(newEdit))
        if (newEdit.author) {
            formData.append("author", newEdit.author);
        }
        axios.put("/api/exchange/" + newEdit.id, formData)
            .then(getExchangeCards)
    }


    return (
        <div>
            <h2>Card Exchange</h2>
            <Card variant={"outlined"} sx={{my:'2rem', mx:'5rem'}}>
                <p> Connect with other collectors and engage in trades or purchase cards directly. <br/> Start building your collection
                    today!</p>
            </Card>
            <ExchangeForm addEntry={addExchangeCard}/>
            <SearchBar handleSearchText={handleSearchTextOnChange}/>
            <ExchangeGallery editEntry={editEntry} entries={filteredExchangeCards} deleteEntry={deleteEntries}/>

        </div>
    )
}