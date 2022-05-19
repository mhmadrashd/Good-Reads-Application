import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {UserBooks} from './data'
import { InputLabel } from '@mui/material';

const columns = [
    { id: 'id', label: 'Book ID', minWidth: 100 },
    { id: 'name', label: 'Book Name', align: 'center', minWidth: 200 },
    {
        id: 'author',
        label: 'Auther Name',
        minWidth: 200,
        align: 'center',
        // format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'avRating',
        label: 'Average Rating',
        minWidth: 200,
        align: 'left',
        // format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'rating',
        label: 'Rating',
        minWidth: 200,
        align: 'left',
        // format: (value) => value.toFixed(2),
    },
    {
        id: 'sheleve',
        label: 'Sheleve',
        minWidth: 200,
        align: 'center',
        // format: (value) => value.toFixed(2),
    },
];



const rows = UserBooks.map((book)=>book)


const shelves = UserBooks.map((book)=>book.sheleve)


export default function StickyHeadTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sheleve, setSheleve] = React.useState(shelves.id);


    const handleChange = (event) => {
        setSheleve(event.target.value);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
};

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%',  overflow: "hidden"}}>
        <TableContainer sx={{ maxHeight: 750}}>
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
                {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                    return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                            const value = row[column.id];
                            if(column.label === "Average Rating") {
                                return(
                                    <TableCell key={column.id} align={column.align}>
                                        <Stack spacing={1} align={column.align}>
                                            <Rating name="half-rating-read" defaultValue={value} precision={0.5} readOnly />
                                        </Stack>
                                    </TableCell>
                                );
                            }
                            else if(column.label === "Rating"){
                                return(
                                    <TableCell key={column.id} align={column.align}>
                                        <Stack spacing={1}>
                                            <Rating name="half-rating" defaultValue={value} precision={0.5} />
                                        </Stack>
                                    </TableCell>
                                )
                            }
                            else if(column.label === "Sheleve"){
                                return(
                                    <TableCell key={column.id} align={column.align}>
                                            <InputLabel id="demo-simple-select-label"></InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={sheleve}
                                                label="Age"
                                                defaultValue={value}
                                                onChange={handleChange} >

                                                <MenuItem value={"Read"}>Read</MenuItem>
                                                <MenuItem value={"Current Reading"}>Current Reading</MenuItem>
                                                <MenuItem value={"Want to Read"}>Want to Read</MenuItem>
                                            </Select>
                                    </TableCell>
                                )
                            }
                            else{
                            return (
                                <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                            );
                            }
                        }
                    )}
                    </TableRow>
                    );
                })}
            </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[5, 10, 50]}
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
