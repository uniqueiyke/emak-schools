import React, { Fragment } from 'react';
import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Header';
import Routers from './Routers';
import {drawerWidth} from '../../libs/css-constants';
import Copyright from './Copyright';

const useStyle = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        marginLeft: drawerWidth,
        [theme.breakpoints.down('xs')]: {
            marginLeft: 0,
        },
        backgroundColor: '#ffffff',
    },
}))

export default function MainPages() {
    const classes = useStyle();
    return (
        <Fragment>
        <CssBaseline />
        {/* <Header /> */}
        <Header />
        <div className={classes.content}>
            <Routers />
        </div>
        <Copyright />
    </Fragment>
    )
}
