import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { generateScratchCard } from '../../redux/actions/admin-action';
import { Typography } from '@material-ui/core';

const useStyle = makeStyles({
    formField: {
        marginTop: 5,
        marginBottom: 5
    },
    btnColor: {
        color: '#008800',
        borderColor: '#008800',
        borderStyle: 'solid',
    },
    btnCancel: {
        color: '#ff2233',
        borderColor: '#ff2233',
        borderStyle: 'solid',
        marginRight: 10,
    },
    nameCl: {
        color: '#04558b',
        fontSize: 'medium',
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    regCl: {
        color: '#5a390d',
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
})

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CardFormModal = ({ open, onClose }) => {

    const classes = useStyle();
    const initialState = {
        pin_length: '12',
        serial_num_length: '13',
        serial_num_prefix: 'egos',
        num_of_cards: '20',
        max_usage: '5',
    }

    const dispatch = useDispatch();
    const [cardState, setCardState] = useState(initialState)
    const history = useHistory();

    const validateNumberInput = (value = '', min = 0, max = 10) => {
        if (typeof (parseInt(value)) === 'number') {
            if (value < min || value > max) {
                return '';
            }
            return value;
        }
        return value;
    }

    const validFields = (name, value) => {
        if (name === 'serial_num_prefix') {
            return value;
        }
        if (name === 'pin_length') {
            return validateNumberInput(value, 0, 15);
        }
        if (name === 'serial_num_length') {
            return validateNumberInput(value, 0, 20);
        }
        if (name === 'num_of_cards') {
            return validateNumberInput(value, 0, 1000);
        }
        if (name === 'max_usage') {
            return validateNumberInput(value, 0, 10);
        }
    }

    const onChange = e => {
        setCardState({ ...cardState, [e.target.name]: validFields(e.target.name, e.target.value) });
    }

    const onSubmit = e => {
        dispatch(generateScratchCard({
            ...cardState,
            serial_num_prefix: cardState.serial_num_prefix.toUpperCase(),
        }));
        setCardState(initialState);
        e.preventDefault();
        onClose();
        history.push('/admin/avaliable/scratch-cards');
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="card-form-dialog-title"
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="card-form-dialog-description"
        >
            <DialogTitle id="card-form-dialog-title">Card Generation Form</DialogTitle>
            <DialogContent>
                <DialogContentText component={'div'} id="card-form-dialog-description" >
                    <Typography>
                        Enter the information in the required fields to generate 
                        scratch card details.
                    </Typography>
                    <Typography>
                        The number of digits for the serial number
                        should be at least three (3) longer than the prefix length.<br />
                        Example: If the serial number should total of 7 charaters long,
                        then the prefix should be at most 4 character long.
                    </Typography>
                </DialogContentText>
                <form onSubmit={onSubmit}>
                    <FormControl fullWidth className={classes.formField}>
                        <TextField name="pin_length"
                            label="Pin Length"
                            value={cardState.pin_length}
                            onChange={onChange}
                            variant="outlined"
                            type='number'
                            size='small'
                            inputProps={{
                                min: 9,
                                max: 15,
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth className={classes.formField} >
                        <TextField name="serial_num_length"
                            label="serial Number Length"
                            value={cardState.serial_num_length}
                            onChange={onChange}
                            variant="outlined"
                            type='number'
                            size='small'
                            inputProps={{
                                min: 7,
                                max: 20,
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth className={classes.formField} >
                        <TextField name="serial_num_prefix"
                            label="Serial Number Prefix"
                            value={cardState.serial_num_prefix}
                            onChange={onChange}
                            variant="outlined"
                            type='text'
                            size='small'
                        />
                    </FormControl>
                    <FormControl fullWidth className={classes.formField} >
                        <TextField name="num_of_cards"
                            label="Number of Cards"
                            value={cardState.num_of_cards}
                            onChange={onChange}
                            variant="outlined"
                            type='number'
                            size='small'
                            inputProps={{
                                min: 20,
                                max: 1000,
                                step: 10,
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth className={classes.formField} >
                        <TextField name="max_usage"
                            label="Number of usage per card"
                            value={cardState.max_usage}
                            onChange={onChange}
                            variant="outlined"
                            type='number'
                            size='small'
                            inputProps={{
                                min: 0,
                                max: 10,
                            }}
                        />
                    </FormControl>
                </form>
            </DialogContent>
            <DialogActions>
                <Button
                    variant='outlined'
                    className={classes.btnColor}
                    type='submit' size='small'
                    onClick={onSubmit}
                >Submit</Button>
                <Button
                    variant='outlined'
                    className={classes.btnCancel}
                    size='small'
                    onClick={onClose}
                >Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CardFormModal
