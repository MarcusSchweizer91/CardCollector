import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import axios from "axios";
import {CardToExchange} from "../../models/CardToExchange";
import {Paper, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import "../css/ExchangeCardDetails.css"

export default function ExchangeDetails() {

    const exchangeParams = useParams()
    const [exchangeEntry, setExchangeEntry] = useState<CardToExchange>()


    const id: string | undefined = exchangeParams.id

    useEffect(() => {
        if (id) {
            getEntryByID(id)
        }
    }, [id])

    function getEntryByID(id: string) {
        axios.get("/api/exchange/" + id)
            .then(response => response.data)
            .then(data => {
                setExchangeEntry(data)
            })
            .catch(console.error)
    }


    return (
        <div>
            {!exchangeEntry && <p>loading...</p>}
            {exchangeEntry &&

                <Stack spacing={1}>
                    <Paper className={"margin-sides"}>
                        <Paper className={"padding"} >
                            <h2>{exchangeEntry.name}</h2>
                        </Paper>
                        <Box className={"padding"}>
                            <p>Card description: <br/> {exchangeEntry.description}</p>
                            <p className={"padding"}>Search or Offer: <br/> {exchangeEntry.type}</p>
                            <p className={"padding"}>Price: <br/> {exchangeEntry.price} EUR</p>
                            <p className={"padding"}>Alternative Trade: <br/> {exchangeEntry.alternative}</p>
                        </Box>
                    </Paper>
                </Stack>


            }

        </div>
    )
}