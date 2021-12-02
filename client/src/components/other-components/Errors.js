import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    btn: {
        borderColor: 'green',
        borderStyle: 'solid',
        color: 'green',
        '& :hover': '#00800054'
    }
})

export default function Errors({ errors, goBack }) {
    const history = useHistory();
    const classes = useStyles();
    if (errors) {
        const { message, status, statusText } = errors;
        return (
            <div>
                <Typography variant='h3' color='error' >Error {status}: {statusText}</Typography>
                <Typography variant='h4' color='error' >{message}</Typography>

                {goBack ?
                    <Button
                        onClick={() => history.goBack()}
                        variant='outlined'
                        className={classes.btn}
                    >
                        Back
                    </Button>
                    : <Button
                        onClick={() => history.push('/')}
                        startIcon={<HomeIcon />}
                        variant='outlined'
                        className={classes.btn}
                    >
                        Go To Home Page
                    </Button>}
            </div>
        )
    } else {
        return <></>
    }

}

Errors.propTypes = {
    errors: PropTypes.object.isRequired,
    goBack: PropTypes.bool,
}