import ExchangeGallery from "./Exchange Gallery";
import {CardToExchange} from "../../models/CardToExchange";
import axios from "axios";
import {useEffect, useState} from "react";
import ExchangeForm from "./ExchangeForm";
import SearchBar from "../SearchBar";

export default function ExchangeApp(){

    const[exchangeCards, setExchangeCards] = useState<CardToExchange[]>([])
    const[searchText, setSearchText] = useState<string>("")


    function handleSearchTextOnChange(searchText:string){
        setSearchText(searchText)
    }
    const filteredExchangeCards = exchangeCards.filter((exchangeCard) =>
    exchangeCard.name.toLowerCase().includes(searchText.toLowerCase()))

    useEffect(()=>{
        getExchangeCards()
    },[])

    function getExchangeCards(){
        axios.get("/api/exchange").then((response)=>{
            setExchangeCards(response.data)
        })
            .catch(e=>console.error(e))
    }

    const addExchangeCard = (newCard: CardToExchange) =>{

        axios.post("/api/exchange", newCard).then().catch(e=>console.error(e))

    }

    return(
        <div>
            <ExchangeForm addEntry={addExchangeCard}/>
            <SearchBar handleSearchText={handleSearchTextOnChange}/>
            <ExchangeGallery entries={filteredExchangeCards}/>

        </div>
    )
}