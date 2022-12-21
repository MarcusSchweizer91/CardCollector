import {CardToExchange} from "../../models/CardToExchange";
import {Button} from "@mui/material";

type ExchangeCardProps ={
    exchangeCard: CardToExchange
    deleteEntry:(id?:string)=>void
}


export default function ExchangeCard(props: ExchangeCardProps){

function onClickDelete (){
    props.deleteEntry(props.exchangeCard.id)

}

    return(
        <div>
            <h5>{props.exchangeCard.name}</h5>
            <p>{props.exchangeCard.description}</p>
            <p>{props.exchangeCard.type}</p>
            <p>{props.exchangeCard.price}</p>
            <p>{props.exchangeCard.alternative}</p>

            <Button onClick={onClickDelete}>Delete</Button>
            <Button>Edit</Button>
        </div>
    )
}