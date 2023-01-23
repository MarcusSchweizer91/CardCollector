import {UserData} from "../../models/UserData";
import {useEffect, useState} from "react";
import useCards from "../hooks/useCards";
import {PokeCard} from "../../models/PokeCard";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Typography
} from "@mui/material";
import {useNavigate} from "react-router-dom";

type UserDetailsProps = {

    userInfo?: UserData
    getFavoriteCards: () => Promise<string[]>
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

                                    <Button href="/exchange" variant={"outlined"} size="small" color="primary">
                                        Buy
                                    </Button>
                                    <Button href="/exchange" variant={"outlined"} size="small" color="primary">
                                        Exchange
                                    </Button>
                                    <Button variant={"outlined"} size="small" color="primary">
                                        Delete
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
