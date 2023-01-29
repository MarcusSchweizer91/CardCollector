import {Button, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import "../css/LoginPage.css";

import {useNavigate} from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import useAuthCheck from "../hooks/useAuthCheck";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from "@mui/material/Alert";


type LoginPageProps={
    login: (username:string, password:string)=> Promise<string>
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function LoginPage(props: LoginPageProps){

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessageError, setSnackbarMessageError] = useState("");
    const [snackbarMessageSuccess, setSnackbarMessageSuccess] = useState("");
    const navigate = useNavigate()
    const isLoggedIn = useAuthCheck();


    useEffect(() => {
        if (isLoggedIn) {
            setOpenSnackbar(true);
            setSnackbarMessageError("Already logged in!");
            setTimeout(() => {
                navigate("/");
            }, 3000); //3000ms bis zur Umleitung
        }
    }, [isLoggedIn, navigate])



    const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
        setSnackbarMessageSuccess("");
        setSnackbarMessageError("");
    }



    function onChangeUsername(event: ChangeEvent<HTMLInputElement>){
        setUsername(event.target.value)
    }

    function onChangePassword(event: ChangeEvent<HTMLInputElement>){
        setPassword(event.target.value)
    }

    function loginSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        props.login(username,password)
            .then(() => {
                setOpenSnackbar(true);
                setSnackbarMessageSuccess("Successfully logged in!");
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            })
            .catch(() => {
                setOpenSnackbar(true);
                setSnackbarMessageError("Invalid username or password!");
            });
    }



    return(

        <div>
            <h2>Login</h2>
            <Box
                component="form"
                onSubmit={loginSubmit}
                className={"login-box"}
            >
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
            />

                <Button sx={{mt: 2}} type={"submit"} variant="contained" endIcon={<SendIcon/>}>
                    Login
                </Button>
            </Box>
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarMessageError ? "error" : "success"} sx={{ width: '100%' }}>
                    {snackbarMessageError || snackbarMessageSuccess}
                </Alert>
            </Snackbar>

        </div>
    )
}