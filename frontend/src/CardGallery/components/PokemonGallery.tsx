import {PokeCard} from "../models/PokeCard";
import PokemonCard from "./PokemonCard";
import {Container, Grid, Typography} from "@mui/material";

type PokemonGalleryProps = {
    cards: PokeCard[]
}

export default function PokemonGallery(props: PokemonGalleryProps) {

    const cardComponents = props.cards.map(cardData => {
        return <PokemonCard card={cardData} key={cardData.id}/>
    })

    return (
        <div>
            <Container>
                <Typography variant={"h2"} align={"center"} m={2}>
                    All Cards
                </Typography>
                <Grid container justifyContent={"space-evenly"}>
                    {cardComponents}
                </Grid>
            </Container>
        </div>
    )
}