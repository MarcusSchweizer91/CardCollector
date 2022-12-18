import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {PokeCard} from "../models/PokeCard";


type PokemonCardProps = {
    card: PokeCard

}

export default function PokemonCard(props: PokemonCardProps) {


    const attacksComponents = props.card.attacks.map((attacks) => {
        return attacks.name;
    })


    return (

        <Grid m={6}>
            <Card>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        image={props.card.images.small}
                        alt="Pokeball"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.card.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {props.card.hp}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {attacksComponents}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        Favorites
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


    )
}