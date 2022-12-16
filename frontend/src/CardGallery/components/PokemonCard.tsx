import {Card} from "../models/Card";



type PokemonCardProps = {
    card: Card

}

export default function PokemonCard(props: PokemonCardProps) {



    const attacksComponents = props.card.attacks.map((attacks)=>{
        return attacks.name;
    })

    return (
        <div>
            <h2>{props.card.name}</h2>
            <p>{props.card.hp}</p>
            <p>{attacksComponents}</p>
        </div>
    )

}