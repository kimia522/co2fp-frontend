// React Import
import * as React from 'react';
import {useTheme} from "@mui/material";
import {useNavigate} from "react-router-dom";
// Material Ui Components
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from "@mui/material/Button";
// Styles
import './style/appbar.css';
// Deletation Dialog Fragment
import DialogDeleteUser from "./dialog";
// Authentication
import {useAuth} from "../hooks/useAuth";

export default function MenuAppBar() {
    const {AuthD,setAuthD} = useAuth();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElmenu, setAnchorElmenu] = React.useState(null);
    //

    //
    const theme = useTheme;
    const naVigate = useNavigate();

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleElMenu = (event) => {
        setAnchorElmenu(event.currentTarget);
    };

    const handleClosemenu = () => {
        setAnchorElmenu(null);
    };

    const handleChangePage = (page)=>{
        if(page==="AdminPage"){
            naVigate("/admin")
        }else{
            naVigate("/dashboard")
        }
    }
    const handleDelete = ()=>{
        return null;
    }
    const handleLogout = ()=>{
        localStorage.clear();
        naVigate("/signing");
        window.location.reload();
    }

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    {AuthD && (<>
                    {/*{true && (<>*/}
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={handleElMenu}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElmenu}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            sx={{marginTop:'2.35%'}}
                            open={Boolean(anchorElmenu)}
                            onClose={handleClosemenu}
                        >
                            {AuthD && AuthD.admin && <MenuItem onClick={handleClosemenu}>
                            {/*    {true && true && <MenuItem onClick={handleClosemenu}>*/}
                                <Button sx={{color: `${theme().palette.primary.light}`, ":hover": {color: 'black'}}}
                                        onClick={() => handleChangePage("AdminPage")}>
                                    AdminPage
                                </Button>
                            </MenuItem>}
                            <MenuItem onClick={handleClosemenu}>
                                <Button sx={{color:`${theme().palette.primary.light}`,":hover":{color:'black'}}} onClick={()=>handleChangePage("UserPage")}>
                                    UserPage
                                </Button>
                            </MenuItem>
                        </Menu>
                    </>)}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Co2 Tracker Site
                    </Typography>
                    {AuthD && (
                        // {true && (
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
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                sx={{marginTop:'2.35%'}}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>
                                    <DialogDeleteUser btnTitle={"Delete Account"}/>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <Box sx={{display:'flex',flexDirection:'column'}}>
                                        <Button onClick={handleLogout} sx={{color:`${theme().palette.primary.light}`,marginLeft:'10px',":hover":{color:'black'}}}>
                                            logout
                                        </Button>
                                    </Box>
                                </MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>

    );
}
