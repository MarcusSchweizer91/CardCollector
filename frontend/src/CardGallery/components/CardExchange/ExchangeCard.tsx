import {CardToExchange} from "../../models/CardToExchange";
import {Button, Card} from "@mui/material";


type ExchangeCardProps = {
    exchangeCard: CardToExchange
    deleteEntry: (id?: string) => void
}


export default function ExchangeCard(props: ExchangeCardProps) {

    function onClickDelete() {
        props.deleteEntry(props.exchangeCard.id)

    }

    return (
        <div>
            <Card variant={"outlined"} sx={{m:'1rem', maxWidth:'30rem'}}>
                <h5>{props.exchangeCard.name}</h5>
                <p>{props.exchangeCard.description}</p>
                <p>{props.exchangeCard.type}</p>
                <p>{props.exchangeCard.price}</p>
                <p>{props.exchangeCard.alternative}</p>

                <Button sx={{mb:'1rem', mr:'.5rem'}} variant={'outlined'} onClick={onClickDelete}>Delete</Button>
                <Button sx={{mb:'1rem', ml:'.5rem'}} variant={'outlined'}>Edit</Button>
            </Card>
        </div>
    )
}