import React from 'react';
import { useLocation } from 'react-router-dom';
import { Typography } from '@material-ui/core';


export default function Page404() {
    let location = useLocation()
    return (
        <Typography variant='h5'>
            Whoops..... path <code>{location.pathname}</code> not found
        </Typography>
    )
}
