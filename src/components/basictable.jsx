// React Import
import * as React from 'react';
import {useEffect, useState} from "react";
// Material Ui Imports
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
// Services Imports
import {DeleteTransport, GetAllTransports} from "../services/transport-services";

export default function Basictable({Data,setData}) {
    const [refresh, setRefresh] = React.useState(false);


    const handleDelete = async (id) => {
        console.log("Deleting transfer with ID:", id);

        try {
            await DeleteTransport({ setData, id });

            await GetAllTransports(setData);

            setRefresh(prev => !prev);
        } catch (error) {
            console.error("Error deleting answer:", error);
        }
    };

    return (
        <TableContainer component={Paper} sx={{width:'auto !important', display:'flex', justifyContent:'center !important', marginTop:'5%'}}>
            <Table sx={{ minWidth: 'inherit !important' , width:'inherit !important', maxWidth:'inherit !important'}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {Data && <TableCell>Transport Name</TableCell>}
                        {Data && <TableCell align="center">emission factor</TableCell>}
                        {Data && <TableCell align="center"> fuel adjustment factor</TableCell>}
                        {Data && <TableCell align="left">Action</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(Data) && Data.map((row,index) => (
                        <TableRow
                            key={row.transport_id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.transport_name}
                            </TableCell>
                            <TableCell align="center">{row.emission_factor}</TableCell>
                            <TableCell align="center">{row.fuel_factor}</TableCell>
                            <Button
                                variant="outlined"
                                sx={{marginTop:'5px'}}
                                onClick={()=>{handleDelete(row.transport_id)}}
                            >
                                Delete
                            </Button>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
