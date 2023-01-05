import {Button, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {ChangeEvent, FormEvent, useState} from "react";

import {useNavigate} from "react-router-dom";

type LoginPageProps={
    login: (username:string, password:string)=> Promise<string>
}

export default function LoginPage(props: LoginPageProps){

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const navigate = useNavigate()

    function onChangeUsername(event: ChangeEvent<HTMLInputElement>){
        setUsername(event.target.value)
    }

    function onChangePassword(event: ChangeEvent<HTMLInputElement>){
        setPassword(event.target.value)
    }

    function loginSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()

        props.login(username,password)
            .then(user => {
                navigate("/")
            })
    }

    return(

        <div>
            <h2>LoginPage</h2>
            <Box
                component="form"
                onSubmit={loginSubmit}
            >
            <TextField
                required
                id="outlined-required"
                label="Username"
                value={username}
                onChange={onChangeUsername}
            />

            <TextField
                required
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={onChangePassword}
            />

            <Button type={"submit"}>Login</Button>
            </Box>
        </div>
    )
}