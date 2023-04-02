import {Alert, Snackbar} from "@mui/material";
import React from "react";

const SnackbarInfo = ({openState, setOpenState, severity, message}) => {

    const handleClose = (event, reason, setter) => {
        if (reason === 'clickaway') {
            return;
        }
        setter(false);
    };

    return (
        <Snackbar
            open={openState}
            autoHideDuration={4000}
            onClose={() => handleClose(null, null, setOpenState)}
            severity={severity}
        >
            <Alert onClose={() => handleClose(null, null, setOpenState)} severity={severity} sx={{
                width: '100%',
                fontSize: '1.4rem',
                color: 'white',
                fontWeight: '700',
            }}
                   variant='filled'
            >
                {message}
            </Alert>
        </Snackbar>
    )
}

export default SnackbarInfo;