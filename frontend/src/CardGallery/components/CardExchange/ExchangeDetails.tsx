import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import axios from "axios";
import {CardToExchange} from "../../models/CardToExchange";


export default function ExchangeDetails(){

    const exchangeParams = useParams()
    const [exchangeEntry, setExchangeEntry] = useState<CardToExchange>()



    const id: string | undefined  = exchangeParams.id

    useEffect(()=>{
        if(id){
            getEntryByID(id)
        }
    },[id])

    function getEntryByID(id:string){
        axios.get("/api/exchange/"+id)
            .then(response => response.data)
            .then(data=>{
                setExchangeEntry(data)
            })
            .catch(console.error)
    }





    return(
        <div>
            {! exchangeEntry && <p>loading...</p>}
            {exchangeEntry &&

                <div>
                    <h2>{exchangeEntry.name}</h2>
                    <p>{exchangeEntry.description}</p>
                    <p>{exchangeEntry.type}</p>
                    <p>{exchangeEntry.price}</p>
                    <p>{exchangeEntry.alternative}</p>
                </div>



            }

        </div>
    )
}