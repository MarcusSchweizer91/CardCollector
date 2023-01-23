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
import {ChangeEvent, useEffect, useState} from "react";



type PokemonCardProps = {
    card: PokeCard
    addCardToFavorites(id:string):void
    isCardInFavorites:(cardId: string) => Promise<boolean>
    removeCardFromFavorites: (cardId: string) => Promise<void>;

}

export default function PokemonCard(props: PokemonCardProps) {

    const [isInFavorites, setIsInFavorites] = useState(false);

    useEffect(() => {
        props.isCardInFavorites(props.card.id).then(result => setIsInFavorites(result));
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (isInFavorites) {
            props.removeCardFromFavorites(props.card.id!);
        } else {
            props.addCardToFavorites(props.card.id!);
        }
        setIsInFavorites(!isInFavorites);
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
                        checked={isInFavorites}
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