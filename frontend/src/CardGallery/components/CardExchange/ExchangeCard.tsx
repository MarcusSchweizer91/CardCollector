import {CardToExchange} from "../../models/CardToExchange";
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {ChangeEvent, useState} from "react";
import "../css/ExchangeCard.css"


type ExchangeCardProps = {
    exchangeCard: CardToExchange
    deleteEntry: (id?: string) => void
    editEntry: (newEdit: CardToExchange) => void
}


export default function ExchangeCard(props: ExchangeCardProps) {

    const [showButton, setShowButton] = useState<boolean>(false)
    const navigate = useNavigate()

    const [name, setName] = useState(props.exchangeCard.name)
    const [description, setDescription] = useState(props.exchangeCard.description)
    const [type, setType] = useState(props.exchangeCard.type)
    const [price, setPrice] = useState(props.exchangeCard.price)
    const [alternative, setAlternative] = useState(props.exchangeCard.alternative)
    const [author] = useState(props.exchangeCard.author)


    function onClickEditButton() {
        setShowButton(true)
        console.log(showButton)
    }

    function handleChange() {
        const newEdit: CardToExchange = {
            id: props.exchangeCard.id,
            name: name,
            description: description,
            type: type,
            price: price,
            alternative: alternative,
            author: author
        }
        props.editEntry(newEdit)
        setShowButton(false)
    }


    function onClickDelete() {
        props.deleteEntry(props.exchangeCard.id)

    }

    function handleDetailsClick() {
        navigate("/exchange/" + props.exchangeCard.id)
    }

    function handleChatButtonOnClick(){
        navigate(`/chat/${props.exchangeCard.author}`)
    }

    return (
        <div>
            <Grid m={6}>
                <Card>{props.exchangeCard.base64Image &&
                    <CardMedia component={"img"} src={`data:image/png;base64,${props.exchangeCard.base64Image}`}/>
                }
                    <CardContent>
                        <Typography gutterBottom variant="h5"
                                    component="div">
                            {props.exchangeCard.name}
                        </Typography>
                        <input className={showButton ? "show" : "disappear"} type={"text"}
                               onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                   setName(event.target.value)
                               }} value={name}/>

                        <Typography gutterBottom variant="body1" component="div">
                            {props.exchangeCard.description}
                        </Typography>
                        <input className={showButton ? "show" : "disappear"} type={"text"}
                               onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                   setDescription(event.target.value)
                               }} value={description}/>

                        <Typography gutterBottom variant="body1" component="div">
                            {props.exchangeCard.type}
                        </Typography>
                        <input className={showButton ? "show" : "disappear"} type={"text"}
                               onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                   setType(event.target.value)
                               }} value={type}/>

                        <Typography gutterBottom variant="body1" component="div">
                            {props.exchangeCard.price}
                        </Typography>
                        <input className={showButton ? "show" : "disappear"} type={"text"}
                               onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                   setPrice(event.target.value)
                               }} value={price}/>

                        <Typography gutterBottom variant="body1" component="div">
                            {props.exchangeCard.alternative}
                        </Typography>
                        <input className={showButton ? "show" : "disappear"} type={"text"}
                               onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                   setAlternative(event.target.value)
                               }} value={alternative}/>
                    </CardContent>



                    <CardActions>
                        <Button variant={"outlined"} onClick={onClickDelete} size="small" color="primary">
                            Delete
                        </Button>
                        <Button onClick={handleDetailsClick} variant={"outlined"} size="small" color="primary">
                            Details
                        </Button>
                        <Button onClick={onClickEditButton} variant={"outlined"} size="small" color="primary" className={showButton? "disappear" : "show"} > Edit </Button>
                        <Button onClick={handleChange} variant={"outlined"} size="small" color="primary" className={showButton? "show" : "disappear"}>
                            Save
                        </Button>
                        <Button onClick={handleChatButtonOnClick} variant={"outlined"} size="small" color="primary">
                            Send Message
                        </Button>
                    </CardActions>
                </Card>
            </Grid>

        </div>
    )
}