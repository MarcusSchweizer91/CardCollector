import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Menu, MenuItem} from "@mui/material";
import {NavLink} from "react-router-dom";
import "../components/css/NavBar.css"
import {AccountCircle} from "@mui/icons-material";


export default function NavBar() {

    const [menu, setMenu] = React.useState<null | HTMLElement>(null)
    const [userLogin, setUserLogin] = React.useState<null | HTMLElement>(null)

    const open = Boolean(menu)
    

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenu(event.currentTarget);
    }

    const handleClose = () => {
        setMenu(null)
        setUserLogin(null)
    }

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setUserLogin(event.currentTarget);

    };


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={menu}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem  onClick={handleClose}><NavLink className={"dropDownNL"} to={"/"}>AllCards</NavLink></MenuItem>
                        <MenuItem  onClick={handleClose}><NavLink className={"dropDownNL"} to={"/exchange"}>CardExchange</NavLink></MenuItem>
                        <MenuItem  onClick={handleClose}><NavLink className={"dropDownNL"} to={"/user"}>MyAccount</NavLink></MenuItem>
                    </Menu>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Hier steht Ihre Überschrift
                    </Typography>
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"

                        >
                            <AccountCircle />
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
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}><NavLink className={"loginDropDown"} to={"/login"}>Login</NavLink></MenuItem>
                            <MenuItem onClick={handleClose}><NavLink className={"loginDropDown"} to={"/newUser"}>SingUp</NavLink></MenuItem>
                            <MenuItem onClick={handleClose}><NavLink className={"loginDropDown"} to={"/user"}>MyAccount</NavLink></MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}