import {FavoriteCard} from "../../models/FavoriteCard";
type FavCardProps ={
    favorite: FavoriteCard
}
export default function FavCard(props: FavCardProps){


    return(
        <div>
            <p>{props.favorite.id}</p>
        </div>
    )
}