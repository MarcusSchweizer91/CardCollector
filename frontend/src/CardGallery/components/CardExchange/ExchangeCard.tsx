import {CardToExchange} from "../../models/CardToExchange";
import {Button, Card, CardActionArea, CardActions, CardContent, Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";


type ExchangeCardProps = {
    exchangeCard: CardToExchange
    deleteEntry: (id?: string) => void
}


export default function ExchangeCard(props: ExchangeCardProps) {


    const navigate = useNavigate()

    function onClickDelete() {
        props.deleteEntry(props.exchangeCard.id)

    }

    function handleDetailsClick(){
        navigate("/exchange/" + props.exchangeCard.id)
    }
    return (
        <div>
            <Grid m={6}>
                <Card>
                    <CardActionArea onClick={handleDetailsClick}>

                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {props.exchangeCard.name}
                            </Typography>
                            <Typography gutterBottom variant="body1" component="div">
                                {props.exchangeCard.description}
                            </Typography>
                            <Typography gutterBottom variant="body1" component="div">
                                {props.exchangeCard.type}
                            </Typography>
                            <Typography gutterBottom variant="body1" component="div">
                                {props.exchangeCard.price}
                            </Typography>
                            <Typography gutterBottom variant="body1" component="div">
                                {props.exchangeCard.alternative}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button onClick={onClickDelete} size="small" color="primary">
                            Delete
                        </Button>
                        <Button size="small" color="primary">
                            Buy
                        </Button>
                        <Button size="small" color="primary">
                            Trade
                        </Button>
                    </CardActions>
                </Card>
            </Grid>

        </div>
    )
}