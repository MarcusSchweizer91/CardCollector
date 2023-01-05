import {Navigate, Outlet} from "react-router-dom";

type ProtectedRoutesProps={
    username?: string
}

export default function ProtectedRoutes(props: ProtectedRoutesProps){

    const isAuthenticated = props.username !== "unknownUser" && props.username !== null && props.username !== undefined

    return(
        isAuthenticated ? <Outlet /> : <Navigate to={"/login"}/>
    )
}