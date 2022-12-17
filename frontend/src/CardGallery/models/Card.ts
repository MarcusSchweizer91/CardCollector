import {Attacks} from "./Attacks";
import {Images} from "./Images";
export type Card = {

    id:string,
    name:string,
    hp:string,
    attacks: Attacks[],
    images: Images[]
}