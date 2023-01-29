import {Button, TextField} from "@mui/material";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import "../css/RegisterForm.css"
import SendIcon from "@mui/icons-material/Send";
import useAuthCheck from "../hooks/useAuthCheck";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from "@mui/material/Alert";

type RegisterUserProps={
    register: (username:string, password:string, email:string)=>void
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function RegisterForm(props: RegisterUserProps){

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");


    const navigate = useNavigate()

    const isLoggedIn = useAuthCheck();
    useEffect(() => {
        if (isLoggedIn) {
            setOpenSnackbar(true);
            setSnackbarMessage("Already logged in");
            setTimeout(() => {
                navigate("/");
            }, 1500);

        }
    }, [isLoggedIn, navigate])

    const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
        setSnackbarMessage("");
    }

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
        <div className={"top-margin"}>
            <form className={"register-form"} onSubmit={signUpSubmit}>
                <TextField
                    required
                    id="outlined-required"
                    label="Username"
                    value={username}
                    onChange={onChangeUsername}
                    className={"input-field"}
                />
                <TextField
                    required
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={onChangePassword}
                    className={"input-field"}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="E-Mail"
                    value={email}
                    onChange={onChangeEmail}
                />
                <Button sx={{mt: 2}} type={"submit"} variant="contained" endIcon={<SendIcon/>}>
                    Register
                </Button>

            </form>
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={"error"} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>

        </div>
    )
}