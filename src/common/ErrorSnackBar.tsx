import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAppErrorAC } from '../app/app-reducer';
import { AppRootStateType } from '../app/store';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export function ErrorSnackbar() {
    // const [open, setOpen] = React.useState(true);
    const dispatch = useDispatch()
    let error = useSelector<AppRootStateType, string | null>(state => state.app.error)

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC({ error: null }))
        // setOpen(false);
    };

    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {error}
            </Alert>
        </Snackbar>
    );
}