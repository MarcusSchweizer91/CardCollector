import {Attacks} from "./Attacks";
import {Image} from "./Image";
export type FavoriteCard = {

    id:string,
    name:string,
    hp:string,
    attacks: Attacks[],
    images: Image
}