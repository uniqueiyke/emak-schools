import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography';
import { setPageTitle } from '../../libs/utility-functions';
import schoolLogo from '../../images/sch-logo-250x180.png';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import SliderContainer from '../slider/SliderContainer';


const useStyles = makeStyles(theme => ({
    img: {
        marginBottom: 10,
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 0px',
        backgroundColor: '#c4bdbd',
    },
}))

export default function Home() {
   
    const classes = useStyles();
    setPageTitle('Home');
    return (
        <Fragment>
            <Paper className={classes.img}>
            <img
            src={schoolLogo}
            alt="Emak School Logo"
            loading="lazy"
          />
            </Paper>
            <Typography variant='h6'>
                Welcome to Emak God's own schools.
                Home of academic excellent.
            </Typography>
            <SliderContainer />
        </Fragment>
    )
}
