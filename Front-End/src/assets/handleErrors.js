import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenDialog, setOpenSearchDialog } from '../Redux/DataSlice';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import SearchBar from '../Components/subComponents/search/SearchBar';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function MsgDialogs(props) {
    //{props.open}
    //{props.title}
    //{props.msg}
    const [open, setOpen] = React.useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
        dispatch(setOpenDialog(false));
        return props.navigation === 1 ?
            navigate("/") :
            "";
    };
    return (

        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                {props.title}
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom sx={{ fontSize: "25px" }}>
                    {props.state === 1 ?
                        <CheckCircleIcon sx={{ color: "green", fontSize: "30px" }} /> :
                        <ErrorIcon sx={{ color: "red", fontSize: "30px" }} />}
                    {props.msg}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    Close
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
}

export function SearchDialog() {
    const [value, setValue] = React.useState('Books');
    /*
      * BooksData
      * CategoriesData
      * AuthorsData
      */
    const [data, setData] = useState(sessionStorage.getItem("BooksData"));

    const handleChange = (event) => {
        setValue(event.target.value);

        event.target.value === "Books" ? setData(JSON.parse(sessionStorage.getItem("BooksData"))) :
            event.target.value === "Categories" ? setData(JSON.parse(sessionStorage.getItem("CategoriesData"))) :
                setData(JSON.parse(sessionStorage.getItem("AuthorsData")));

        // console.log(JSON.parse(sessionStorage.getItem("BooksData")))
        // console.log(JSON.parse(sessionStorage.getItem("CategoriesData")))
        // console.log(JSON.parse(sessionStorage.getItem("AuthorsData")))
    };
    const [open, setOpen] = React.useState(true);
    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
        dispatch(setOpenSearchDialog(false));
    };

    return (

        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                {"Search"}
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Search In</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={value}
                        onChange={handleChange}
                    >
                        <FormControlLabel value="Books" control={<Radio />} label="Books" />
                        <FormControlLabel disabled value="Categories" control={<Radio />} label="Categories" />
                        <FormControlLabel value="Authors" control={<Radio />} label="Authors" />
                    </RadioGroup>
                </FormControl>
                <SearchBar data={data} type={value} action={handleClose} />
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    Close
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
}

export const PrivateRoute = ({ children }) => {
    // const dispatch = useDispatch();
    // dispatch(setloginState(true));
    const { loginState } = useSelector((state) => state.DataReducer);
    // console.log(loginState)
    return loginState ?
        children :
        <>
            <MsgDialogs title="Open Page" msg={"You Can't open this page before login!"} state={2} navigation={1} />
        </>;
}

export const PrivateRoute2 = ({ children }) => {
    return <Navigate to="/front-end" />;
}