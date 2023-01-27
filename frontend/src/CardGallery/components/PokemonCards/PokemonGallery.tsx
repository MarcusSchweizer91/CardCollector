import {PokeCard} from "../../models/PokeCard";
import PokemonCard from "./PokemonCard";
import { Container, Grid} from "@mui/material";
import Box from "@mui/material/Box";

type PokemonGalleryProps = {
    cards: PokeCard[]

    addCardToFavorites(id:string):void
    isCardInFavorites:(cardId: string) => boolean
    removeCardFromFavorites: (cardId: string) => Promise<void>;
}

export default function PokemonGallery(props: PokemonGalleryProps) {

    const cardComponents = props.cards.map(cardData => {
        return <PokemonCard
                            removeCardFromFavorites={props.removeCardFromFavorites}
                            isCardInFavorites={props.isCardInFavorites}
                            addCardToFavorites={props.addCardToFavorites}
                            card={cardData}
                            key={cardData.id}/>
    })

    return (
        <>
            <main>
                <Box>
                    <Container>
                        <Grid container justifyContent={"space-evenly"}>
                            {cardComponents}
                        </Grid>
                    </Container>
                </Box>
            </main>
        </>
    )
}