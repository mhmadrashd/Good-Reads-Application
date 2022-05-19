import React, { useLayoutEffect, useState } from 'react';
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
// import { UserBooks } from './data'
import { InputLabel } from '@mui/material';
import axios from 'axios'
const URL = "http://localhost:3000/book/userBook/";
const columns = [
    { id: 'bookID', label: 'Book ID', minWidth: 100 },
    { id: 'bookTitle', label: 'Book Name', align: 'center', minWidth: 200 },
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
        id: 'state',
        label: 'Sheleve',
        minWidth: 200,
        align: 'center',
        // format: (value) => value.toFixed(2),
    },
];




/* Filteration of Users Book-Shelve

const readedBooks = UserBooks.filter((book)=>book.sheleve === 'Read')
const currentReadingBooks = UserBooks.filter((book)=>book.sheleve === 'Current Reading')
const wantToReadBooks = UserBooks.filter((book)=>book.sheleve === 'Want to Read')

console.log(wantToReadBooks);

*/


export default function StickyHeadTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setrows] = useState([]);
    const [shelves, setshelves] = useState(null);
    const [UserBooks, setUserBooks] = useState(null);

    const handleChange = (event) => {
        setshelves(event.target.value);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const refresh = 0;
    useLayoutEffect(() => {
        axios.get(URL + localStorage.getItem("id"))
            .then((response) => {
                console.log(response.data)
                setUserBooks(response.data);
                let BooksData = response.data.map((bk) => {
                    return {
                        id: bk._id,
                        user: bk.user,
                        bookID: bk.book._id,
                        bookTitle: bk.book.title,
                        state: bk.state,
                        rating: bk.rating,
                        review: bk.review
                    }
                })
                return BooksData;
            }).then((dataBK) => {
                setrows(dataBK.map((book) => book))
                setshelves(dataBK.map((book) => book.state))
            })
            .catch((error) => {
                console.log(error)
            })
    }, [refresh])

    return (
        <Paper sx={{ width: '100%', overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 750 }}>
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
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            if (column.label === "Average Rating") {
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        <Stack spacing={1} align={column.align}>
                                                            <Rating name="half-rating-read" defaultValue={value} precision={0.5} readOnly />
                                                        </Stack>
                                                    </TableCell>
                                                );
                                            }
                                            else if (column.label === "Rating") {
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        <Stack spacing={1}>
                                                            <Rating name="half-rating" defaultValue={value} precision={0.5} />
                                                        </Stack>
                                                    </TableCell>
                                                )
                                            }
                                            else if (column.label === "Sheleve") {
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        <InputLabel id="demo-simple-select-label"></InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={shelves.id}
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
                                            else {
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {value}
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
