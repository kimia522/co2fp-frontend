// React Imports
import * as React from 'react';
import {useEffect} from "react";
// Material Ui Imports
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
// Services Imports
import {DeleteAnswer, GetAllAnswersExtra} from "../services/answer-services";

const columns = [
    {
        id: 'date',
        label: 'Date',
        minWidth: 100
    },
    {
        id: 'time',
        label: 'Time',
        minWidth: 100
    },
    {
        id: 'distance',
        label: 'Distance',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'passenger_count',
        label: 'Passengers',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'method',
        label: 'transport_name',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'action',
        label: 'Action',
        minWidth: 100,
        align: 'center',
    },
];

export default function StickyHeadTable({datas,setData}) {
    const [rows, setRows] = React.useState(datas);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [refresh, setRefresh] = React.useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        setRows(datas);
    }, [refresh]);

    const handleDelete = async (id) => {
        console.log("Deleting answer with ID:", id);

        try {
            await DeleteAnswer({ setData, id });

            await GetAllAnswersExtra(setData);

            setRefresh(prev => !prev);
        } catch (error) {
            console.error("Error deleting answer:", error);
        }
    };


    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows && rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    {columns.map((column) => {
                                        if (column.id === 'action') {
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    <Button
                                                        variant="contained"
                                                        sx={{backgroundColor:'red',color:'white'}}
                                                        onClick={() => handleDelete(row.id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            );
                                        }
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {row[column.id]}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
