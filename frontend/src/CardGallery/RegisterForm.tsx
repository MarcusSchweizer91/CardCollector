import {Button, TextField} from "@mui/material";
import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";

type RegisterUserProps={
    register: (username:string, password:string, email:string)=>void
}

export default function RegisterForm(props: RegisterUserProps){

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [email, setEmail] = useState<string>("")


    const navigate = useNavigate()

    function onChangeUsername(event: ChangeEvent<HTMLInputElement>){
        setUsername(event.target.value)
    }

    function onChangePassword(event: ChangeEvent<HTMLInputElement>){
        setPassword(event.target.value)
    }

    function onChangeEmail(event: ChangeEvent<HTMLInputElement>){
        setEmail(event.target.value)
    }

    

    function signUpSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()

        props.register(username, password, email)
        setUsername("")
        setPassword("")
        setEmail("")
        navigate("/login")

    }

    return(
        <div>
            <form onSubmit={signUpSubmit}>
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
                <TextField
                    required
                    id="outlined-required"
                    label="E-Mail"
                    value={email}
                    onChange={onChangeEmail}
                />
                <Button type={"submit"}>SignUp</Button>

            </form>
        </div>
    )
}