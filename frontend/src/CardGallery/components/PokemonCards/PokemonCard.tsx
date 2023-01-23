import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Switch,
    Typography
} from "@mui/material";
import {PokeCard} from "../../models/PokeCard";
import {useNavigate} from "react-router-dom";




type PokemonCardProps = {
    card: PokeCard

    addCardToFavorites(id:string):void
    isCardInFavorites:(cardId: string) => boolean
    removeCardFromFavorites: (cardId: string) => Promise<void>;

}

export default function PokemonCard(props: PokemonCardProps) {



    const handleChange = () => {
        if (props.isCardInFavorites(props.card.id)) {
            props.removeCardFromFavorites(props.card.id!);
        } else {
            props.addCardToFavorites(props.card.id!);
        }

    };


    const navigate = useNavigate()

    function handleDetailsClick() {
        navigate("/details/" + props.card.id)
    }


    return (

        <Grid m={6}>
            <Card>
                <CardActionArea onClick={handleDetailsClick}>
                    <CardMedia
                        component="img"
                        image={props.card.images.small}
                        alt="PokeBall"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.card.name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    {/*<Button onClick={addCardIdOnClick} variant={"outlined"} size="small" color="primary">*/}
                    {/*    Add to Favorites*/}
                    {/*</Button>*/}

                    <Switch
                        checked={props.isCardInFavorites(props.card.id)}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />

                    <Button href="/exchange" variant={"outlined"} size="small" color="primary">
                        Buy
                    </Button>
                    <Button href="/exchange" variant={"outlined"} size="small" color="primary">
                        Trade
                    </Button>
                </CardActions>
            </Card>
        </Grid>


    )
}