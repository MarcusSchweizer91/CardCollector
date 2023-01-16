import {Navigate, Outlet} from "react-router-dom";
import {UserData} from "../models/UserData";


type ProtectedRoutesProps={
    userInfo?: UserData
}

export default function ProtectedRoutes(props: ProtectedRoutesProps){

    const isAuthenticated = props.userInfo?.username !== "unknownUser" 

    console.log(props.userInfo)
    return(
        isAuthenticated ? <Outlet /> : <Navigate to={"/login"}/>
    )
}