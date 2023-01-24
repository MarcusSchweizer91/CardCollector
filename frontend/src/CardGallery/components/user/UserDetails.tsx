import {UserData} from "../../models/UserData";
import {ChangeEvent, useEffect, useState} from "react";
import useCards from "../hooks/useCards";
import {PokeCard} from "../../models/PokeCard";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia, Checkbox,
    Grid,
    Typography
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Favorite, FavoriteBorder} from "@mui/icons-material";

type UserDetailsProps = {

    userInfo?: UserData
    addCardToFavorites(id:string):void
    isCardInFavorites:(cardId: string) => boolean
    getFavoriteCards: () => Promise<string[]>
    removeCardFromFavorites: (cardId: string) => Promise<void>
}

export default function UserDetails(props: UserDetailsProps) {
    const {userInfo, getFavoriteCards} = props;
    const {pokeCards} = useCards();
    const [cardsToDisplay, setCardsToDisplay] = useState<PokeCard[]>([]);


    useEffect(() => {
        getFavoriteCards().then(favorites => {
            // @ts-ignore
            const cardsToDisplay = pokeCards.filter(card => favorites.map(f => f.id).includes(card.id));
            setCardsToDisplay(cardsToDisplay);
        });
    }, [pokeCards, getFavoriteCards]);


    const navigate = useNavigate()

    function handleDetailsClick(cardId: string) {
        navigate(`/details/${cardId}`);
    }


    function handleDeleteFavoriteOnClick(event: ChangeEvent<HTMLInputElement>, checked: boolean) {
        const cardId = event.currentTarget.value;
        if (checked) {
            props.addCardToFavorites(cardId);
        } else {
            props.removeCardFromFavorites(cardId);
        }
    }



    return (
        <div>
            {!userInfo && <p>loading...</p>}
            {userInfo &&
                <div>
                    <Card>
                        <h2>UserData:</h2>
                        <h3>{userInfo.username}</h3>
                        <p>{userInfo.email}</p>

                    </Card>

                    <h2>Favorite Cards:</h2>
                    <Grid container justifyContent={"space-evenly"}>
                        {cardsToDisplay.map(card => (


                            <Card key={card.id}>
                                <CardActionArea onClick={()=>handleDetailsClick(card.id)}>
                                    <div key={card.id}>
                                        <CardMedia
                                            component="img"
                                            image={card.images.small}
                                            alt="Pokeball"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {card.name} <br/>
                                                {card.hp}
                                            </Typography>
                                        </CardContent>
                                    </div>
                                </CardActionArea>
                                <CardActions>
                                    <Checkbox
                                        checked={props.isCardInFavorites(card.id)}
                                        onChange={handleDeleteFavoriteOnClick}
                                        value={card.id}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        icon={<FavoriteBorder />}
                                        checkedIcon={<Favorite />}
                                    />
                                    <Button href="/exchange"
                                            variant={"outlined"}
                                            size="small"
                                            color="primary">
                                        Buy
                                    </Button>
                                    <Button href="/exchange"
                                            variant={"outlined"}
                                            size="small"
                                            color="primary">
                                        Exchange
                                    </Button>

                                </CardActions>
                            </Card>


                        ))}
                    </Grid>

                </div>
            }
        </div>
    );


}
