import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import axios from "axios";
import {CardToExchange} from "../../models/CardToExchange";
import {Paper, Stack} from "@mui/material";
import Box from "@mui/material/Box";


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
                    <Paper>
                        <Paper >
                            <h2>{exchangeEntry.name}</h2>
                        </Paper>
                        <Box>
                            <p>Card description: {exchangeEntry.description}</p>
                        </Box>
                        <div>
                            <p>Search or Offer: {exchangeEntry.type}</p>
                            <p>Price: {exchangeEntry.price} EUR</p>
                            <p>Alternative Trade: {exchangeEntry.alternative}</p>
                        </div>
                    </Paper>
                </Stack>


            }

        </div>
    )
}