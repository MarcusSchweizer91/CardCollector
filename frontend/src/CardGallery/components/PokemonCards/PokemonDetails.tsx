import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {PokeCard} from "../../models/PokeCard";
import axios from "axios";
import "../css/PokemonDetails.css";
import {Paper, Stack} from "@mui/material";
import {CostCounter} from "../../models/Attacks";

export default function PokemonDetails() {

    const params = useParams()
    const [pokeCard, setPokeCard] = useState<PokeCard>()


    const id: string | undefined = params.id

    useEffect(() => {
        if (id) {
            getCardByID(id)
        }
    }, [id])

    function getCardByID(id: string) {
        axios.get("/api/cards/details/" + id)
            .then(response => response.data)
            .then(data => {
                setPokeCard(data)
            })
            .catch(console.error)
    }

    const costCount = pokeCard?.attacks.map((attack) => {
        let costCounts: CostCounter = {};
        attack.cost.forEach(cost => {
            costCounts[cost] = (costCounts[cost] || 0) + 1;
        });
        return {
            ...attack,
            costCounts
        }
    });





    return (
        <div>
            {!pokeCard && <p>loading...</p>}
            {pokeCard &&

                <Stack spacing={1}>
                    <Paper className={"margin"}>
                        <h2>{pokeCard.name}</h2>
                    </Paper>
                    <Paper className={"padding margin"} elevation={12}>
                        <img alt={""} src={pokeCard.images.small}/>
                    </Paper>

                    <Paper className={"margin"} >
                        <h2>Hit Points</h2>
                        <div className={"padding"} >{pokeCard.hp} HP</div>
                    </Paper>
                    <Paper className={"margin"} >
                        <h2>Attacks</h2>
                        {costCount?.map((attack) => {
                            return (
                                <div className={"padding margin"} key={attack.name}>
                                    <p>Name: {attack.name}</p>
                                    <p>Damage: {attack.damage || "Not Available"}</p>
                                    <p>Costs: {
                                        Object.entries(attack.costCounts).map(([cost, count]) => {
                                            return `${cost} x${count}`
                                        }).join(', ')
                                    }</p>
                                </div>
                            )
                        })}
                    </Paper>

                </Stack>


            }

        </div>
    )
}