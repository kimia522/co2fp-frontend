// React and React Router Dom import
import * as React from 'react';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
// PropTypes
import PropTypes from 'prop-types';
// Material ui Components
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {useTheme} from "@mui/material";
import Box from "@mui/material/Box";

// based on backend Deletation methods that defined we define 3 state of delatation
const deleteOptions = ['SafeDelete', 'CascadeDelete','ForceDelete'];

// Define the Types of input
SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

function SimpleDialog(props) {

    const theme = useTheme();
    const { onClose, selectedValue, open ,setDeleteOption,id} = props;
    const[data,setData]=useState();
    const naVigate = useNavigate();

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick =  async (value) => {
        console.log("handleListItemClick", value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle sx={{backgroundColor:"primary.main",color:'primary.light'}}>Delete Options</DialogTitle>
            <List sx={{ pt: 0 }} sx={{backgroundColor:"primary.light",color:'primary.main',justifyContent:"center !important", alignItems:"center !important"}}>
                {deleteOptions.map((deleteOption,index) => (
                    <ListItem disablePadding key={deleteOption} sx={{backgroundColor:"inherit"}}>
                        <ListItemButton onClick={() => handleListItemClick(deleteOption)} sx={{backgroundColor:"inherit"}}>
                            <ListItemText primary={deleteOption} sx={{justifyContent:"center !important", alignItems:"center !important"}}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}



export default function DialogDeleteUser({btnTitle}) {
    const [open, setOpen] = React.useState(false);

    const [deleteOption,setDeleteOption] = useState(deleteOptions[1]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    return (
        <Box sx={{display:'flex',flexDirection:'column'}}>
            <Button variant="outlined" onClick={handleClickOpen} sx={{color:"primary.light",":hover":{color:'black'}}}>
                {btnTitle}
            </Button>
            <SimpleDialog
                selectedValue={deleteOption}
                open={open}
                onClose={handleClose}
                setDeleteOption={setDeleteOption}
                id={2}
            />
        </Box>
    );
}
