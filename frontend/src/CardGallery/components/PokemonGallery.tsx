import {Card} from "../models/Card";
import PokemonCard from "./PokemonCard";

type PokemonGalleryProps={
    cards: Card[]
}

export default function PokemonGallery(props:PokemonGalleryProps){
    
    const cardComponents = props.cards.map(cardData =>{
        return <PokemonCard card={cardData} key={cardData.id}/>
    })
    
    return(
        <div>
            {cardComponents}
        </div>
    )
}