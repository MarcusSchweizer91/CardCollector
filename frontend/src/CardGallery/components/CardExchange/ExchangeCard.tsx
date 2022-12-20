import {CardToExchange} from "../../models/CardToExchange";

type ExchangeCardProps ={
    exchangeCard: CardToExchange
}


export default function ExchangeCard(props: ExchangeCardProps){



    return(
        <div>
            <h5>{props.exchangeCard.name}</h5>
            <p>{props.exchangeCard.description}</p>
            <p>{props.exchangeCard.type}</p>
            <p>{props.exchangeCard.price}</p>
            <p>{props.exchangeCard.alternative}</p>

        </div>
    )
}