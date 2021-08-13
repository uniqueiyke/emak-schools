import React, { Fragment } from 'react';
import { CssBaseline } from '@material-ui/core';
import Header from './Header';
import myStyles from '../../css';
import Routers from './Routers';


const useStyles = myStyles();

export default function MainPages() {
    const classes = useStyles();
    return (
        <Fragment>
        <CssBaseline />
        <Header />
        <div className={classes.content}>
            <Routers />
        </div>
    </Fragment>
    )
}
