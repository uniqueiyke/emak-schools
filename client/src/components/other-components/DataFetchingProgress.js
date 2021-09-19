import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
    },
    rootC: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
    progressColor: {
        borderColor: "green",
        borderStyle: "solid",

    },

    rootL: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

function DataFetchingProgress() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.rootL}>
                <LinearProgress color='secondary' />
            </div>
            <div className={classes.rootC}>
                <CircularProgress className={classes.progressColor} />
            </div>
            <div className={classes.rootL}>
                <LinearProgress color='secondary' />
            </div>
        </div>
    )
}

export default DataFetchingProgress
