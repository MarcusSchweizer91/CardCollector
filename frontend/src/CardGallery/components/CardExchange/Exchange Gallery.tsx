import {CardToExchange} from "../../models/CardToExchange";
import ExchangeCard from "./ExchangeCard";

type ExchangeGalleryProps ={
    entries: CardToExchange[]
}

export default function ExchangeGallery(props: ExchangeGalleryProps){

    const exchangeComponents = props.entries.map(exchangeData =>{
        return <ExchangeCard exchangeCard={exchangeData} key={exchangeData.id}/>
    })

    return(
        <div>
            {exchangeComponents}
        </div>

    )
}