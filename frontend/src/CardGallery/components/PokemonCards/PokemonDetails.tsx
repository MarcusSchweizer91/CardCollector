import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {PokeCard} from "../../models/PokeCard";
import axios from "axios";

export default function PokemonDetails(){

    const params = useParams()
    const [pokeCard, setPokeCard] = useState<PokeCard>()


    const id: string | undefined  = params.id

    useEffect(()=>{
        if(id){
            getCardByID(id)
        }
    },[id])

    function getCardByID(id:string){
        axios.get("/api/cards/details/"+id)
            .then(response => response.data)
            .then(data=>{
                setPokeCard(data)
            })
            .catch(console.error)
    }


    return(
        <div>
            {! pokeCard && <p>loading...</p>}
            {pokeCard &&

                <div>
                    <div>
                        <img alt={""} src={pokeCard.images.small}/>
                    </div>
                    <h2>{pokeCard.name}</h2>
                    <p>{pokeCard.hp}</p>
                    <p>{pokeCard.attacks.map((attacks)=>{return attacks.name})}</p>
                </div>


            }

        </div>
    )
}