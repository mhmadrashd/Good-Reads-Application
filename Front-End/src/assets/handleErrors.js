import React, { useEffect } from 'react';
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
import { setloginState, setOpenDialog } from '../Redux/DataSlice';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

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

    const handleClose = () => {
        setOpen(false);
        dispatch(setOpenDialog(false));
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

export const PrivateRoute = ({ children }) => {
    const dispatch = useDispatch();
    // dispatch(setloginState(true));
    const { loginState } = useSelector((state) => state.DataReducer);
    console.log(loginState)
    return loginState ? children : <Navigate to="/" />;
}