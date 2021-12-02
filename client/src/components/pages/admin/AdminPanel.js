import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import SendStaffRegToken from './SendStaffRegToken';
import ComputeResult from '../../grade-book/ComputeResult';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },

    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));

export default function AdminPanel() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={12} md={6} xl={4}>
                    <SendStaffRegToken />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                    <ComputeResult />
                </Grid>
            </Grid>
        </div>
    )
}
