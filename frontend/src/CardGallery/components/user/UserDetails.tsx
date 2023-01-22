
import {UserData} from "../../models/UserData";
import FavCard from "./FavCard";


type UserDetailsProps={
    userInfo?: UserData


}

export default function UserDetails(props: UserDetailsProps){

    const favCards = props.userInfo?.favorites.map(favData =>{
        return <FavCard favorite={favData} key={favData.id}/>
    })


    return(
        <div>
            {! props.userInfo && <p>loading...</p>}
            {props.userInfo &&

                <div>

                    <h2>{props.userInfo.username}</h2>
                    <p>{props.userInfo.email}</p>
                    <p>{props.userInfo.password}</p>
                    <p>{favCards}</p>
                </div>


            }
        </div>
    )
}