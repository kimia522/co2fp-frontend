// React Imports
import React, {useEffect, useState} from "react";
// Material Ui Imports
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import {Typography, useTheme} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// Services Imports
import {GetAllUsersforAdmin} from "../../services/admin-services";
import {GetAllTransports, SetTransport} from "../../services/transport-services";
// Authentication
import {useAuth} from "../../hooks/useAuth";
// Customized Components Imports
import BasicTable from "../../components/basictable";
import UserTable from "../../components/usertable";

const AdminDashboard = ()=>{
    const [refresh, setRefresh] = React.useState(false);
    const theme = useTheme();
    const naVigate = useNavigate();
    const [method,setMethod] = useState("");
    const [emissionfactor,setEmissionfactor] = useState("");
    const [fuelAdjustment,setFuelAdjustment] = useState("");
    const [datauserforadmin,setDataUserForAdmin] = useState('');
    const [datatransports,setDataTransports] = useState('');
    const {AuthD,setAuthD} = useAuth();
    const[DataTransport,setDataTransport] = useState();

    useEffect(()=>{
        if(AuthD && AuthD.admin){
            const getDataUserforAdmin = async () => {
                const data = await GetAllUsersforAdmin(setDataUserForAdmin);
            }
            const getDataTransport = async () => {
                const data = await GetAllTransports(setDataTransports);
            }
            getDataTransport();
            getDataUserforAdmin();
        }else {
            AuthD ? naVigate("/dashboard") : naVigate("/signing");
        }
    }, []);

    useEffect(() => {
        if(AuthD && AuthD.admin){
            const getDataUserforAdmin = async () => {
                const data = await GetAllUsersforAdmin(setDataUserForAdmin);
            }
            const getDataTransport = async () => {
                const data = await GetAllTransports(setDataTransports);
            }
            getDataTransport();
            getDataUserforAdmin();
        }else {
            AuthD ? naVigate("/dashboard") : naVigate("/signing");
        }
    }, [refresh]);

    const handleAdd = async () => {
        if (method && emissionfactor && fuelAdjustment) {
            const transportJson = {
                transport_name: method,
                fuel_factor: fuelAdjustment,
                emission_factor: emissionfactor,
            };
            try {
                await SetTransport({ setDataTransport, transportJson });
            } catch (error) {
                console.error("Error setting answer:", error);
            }finally {
                setMethod("");
                setEmissionfactor("");
                setFuelAdjustment("");
                setRefresh(prev => !prev);
            }
        } else {
            alert("Please fill in all fields.");
        }
    };
    return(
        <Box sx={{width:'100vw',height:'auto',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',
            backgroundColor:`${theme.palette.primary.light}`, paddingTop:'5%'}}>
            <Box sx={{display:'flex',flexDirection:'column',borderStyle: 'solid',margin:'0 10% 0 10%',
                borderWidth: '1px',borderColor:`${theme.palette.primary.main}`,backgroundColor:`white`,padding:'5% 5% 5% 5%',borderRadius:'15px'}}>

                <Typography variant={'h5'} sx={{marginBottom:'5%'}}>Welcome to Admin page</Typography>

                <Box sx={{display:'flex',flexDirection:'column'}}>
                    <Box sx={{display:'flex',flexDirection:'row'}}>
                        <TextField variant={"outlined"} label={"Method"} defaultValue={method} value={method} onChange={(event)=>{setMethod(event.target.value)}}></TextField>
                        <Box sx={{minWidth:'10%'}}></Box>
                        <TextField variant={"outlined"} label={"emission factor"} defaultValue={emissionfactor} value={emissionfactor} onChange={(event)=>{setEmissionfactor(event.target.value)}}></TextField>
                        <Box sx={{minWidth:'10%'}}></Box>
                        <TextField variant={"outlined"} label={"fuel adjustment factor"} defaultValue={fuelAdjustment} value={fuelAdjustment} onChange={(event)=>{setFuelAdjustment(event.target.value)}}></TextField>
                    </Box>

                    <Box sx={{display:'flex',justifyContent:'center',marginTop:'5%'}}>
                        <Button variant={"contained"} onClick={()=>{handleAdd();}}>Add</Button>
                    </Box>

                </Box>

                <Box sx={{marginTop:'5%'}}>
                    <BasicTable Data={datatransports && datatransports} setData={setDataTransports}/>
                </Box>

                <Box>
                    <UserTable Data={datauserforadmin && datauserforadmin}/>
                </Box>
            </Box>
        </Box>
    );
}

export default AdminDashboard;