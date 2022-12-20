import {PokeCard} from "../../models/PokeCard";
import PokemonCard from "./PokemonCard";
import { Container, Grid} from "@mui/material";

type PokemonGalleryProps = {
    cards: PokeCard[]
}

export default function PokemonGallery(props: PokemonGalleryProps) {

    const cardComponents = props.cards.map(cardData => {
        return <PokemonCard card={cardData} key={cardData.id}/>
    })

    return (
        <>
            <main>
                <div>
                    <Container>
                        <Grid container justifyContent={"space-evenly"}>
                            {cardComponents}
                        </Grid>
                    </Container>
                </div>
            </main>
        </>
    )
}