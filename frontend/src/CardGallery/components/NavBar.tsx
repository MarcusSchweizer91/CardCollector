import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {

    Collapse,
    Drawer,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem
} from "@mui/material";
import {NavLink, useNavigate} from "react-router-dom";
import {AccountCircle, StarBorder} from "@mui/icons-material";
import logo from "../img/Logo2.png"
import {useState} from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import "../components/css/NavBar.css"
type Anchor = 'left';


type NavBarProps ={
    logout:() => Promise<string>
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function NavBar(props: NavBarProps) {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [menu, setMenu] = React.useState<null | HTMLElement>(null)
    const [userLogin, setUserLogin] = React.useState<null | HTMLElement>(null)
    const [state, setState] = React.useState({

        left: false

    });
    const open = Boolean(menu)

    const navigate = useNavigate()

    const handleCloseLoginMenu = () => {
        setMenu(null)
        setUserLogin(null)
    }

    const handleLogout = async () => {
        try {
            const message = await props.logout();
            setSnackbarMessage(message);
            setOpenSnackbar(true);
            handleCloseLoginMenu();
            navigate("/");

        } catch (error) {
            setSnackbarMessage("Error while logging out!");
            setOpenSnackbar(true);
        }
    };





    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setUserLogin(event.currentTarget);

    };



    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({...state, [anchor]: open});
            };



    const list = (anchor: Anchor) => (
        <Box
            sx={{}}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>

                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemText><NavLink className={"dropDownNL"} to={"/"}>AllCards</NavLink></ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemText><NavLink className={"dropDownNL"}
                                               to={"/exchange"}>Exchange</NavLink></ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemText><NavLink className={"dropDownNL"} to={"/chatoverview"}>Chat</NavLink></ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemText><NavLink className={"dropDownNL"} to={"/user"}>Your Profile</NavLink></ListItemText>
                    </ListItemButton>
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Starred" />
                        </ListItemButton>
                    </List>
                </Collapse>
            </List>

        </Box>
    );
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Grid container justifyContent={"space-between"}>
                        <div>
                            {(['left'] as const).map((anchor) => (
                                <React.Fragment key={anchor}>

                                    <IconButton
                                        size="large"
                                        edge="start"
                                        color="inherit"
                                        aria-label="menu"
                                        sx={{mr: 2}}
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={toggleDrawer(anchor, true)}
                                    >
                                        <MenuIcon/>
                                    </IconButton>
                                    <Drawer
                                        anchor={anchor}
                                        open={state[anchor]}
                                        onClose={toggleDrawer(anchor, false)}
                                    >
                                        {list(anchor)}
                                    </Drawer>
                                </React.Fragment>
                            ))}
                        </div>
                        <div>
                            <NavLink to={"/"}><img src={logo} alt={"logo"}/></NavLink>
                        </div>
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"

                            >
                                <AccountCircle/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={userLogin}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(userLogin)}
                                onClose={handleCloseLoginMenu}
                            >
                                <MenuItem onClick={handleCloseLoginMenu}><NavLink className={"loginDropDown"}
                                                                         to={"/register"}>Register</NavLink></MenuItem>

                                <MenuItem onClick={handleCloseLoginMenu}><NavLink className={"loginDropDown"}
                                                                         to={"/login"}>Login</NavLink></MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>




                            </Menu>
                        </div>
                        <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
                            <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                                {snackbarMessage}
                            </Alert>
                        </Snackbar>
                    </Grid>
                </Toolbar>
            </AppBar>

        </Box>

    );
}