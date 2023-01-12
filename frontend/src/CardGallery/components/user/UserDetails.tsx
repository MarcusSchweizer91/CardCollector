
import {UserData} from "../../models/UserData";


type UserDetailsProps={
    userInfo?: UserData

}

export default function UserDetails(props: UserDetailsProps){




    return(
        <div>
            {! props.userInfo && <p>loading...</p>}
            {props.userInfo &&

                <div>

                    <h2>{props.userInfo.username}</h2>
                    <p>{props.userInfo.email}</p>
                    <p>{props.userInfo.password}</p>
                    <p>{props.userInfo.favorites}</p>
                </div>


            }
        </div>
    )
}