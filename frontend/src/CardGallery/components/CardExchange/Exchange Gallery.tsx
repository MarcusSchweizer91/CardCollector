import {CardToExchange} from "../../models/CardToExchange";
import ExchangeCard from "./ExchangeCard";

type ExchangeGalleryProps ={
    entries: CardToExchange[]
    deleteEntry:(id?:string)=>void
}

export default function ExchangeGallery(props: ExchangeGalleryProps){

    const exchangeComponents = props.entries.map(exchangeData =>{
        return <ExchangeCard exchangeCard={exchangeData} key={exchangeData.id} deleteEntry={props.deleteEntry}/>
    })

    return(
        <div>
            {exchangeComponents}
        </div>

    )
}