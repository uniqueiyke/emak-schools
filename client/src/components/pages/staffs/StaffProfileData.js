import React, { useState, useEffect } from 'react';
import {
    TextField,
    FormControl,
    Typography,
    IconButton,
    Container,
    Grid,
    Card,
    CardActions,
    CardContent,
    Hidden,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import StaffProfileContentHelper from './StaffProfileContentHelper';
import { updateStaffData } from '../../../redux/actions/staff-action';
import { useDispatch } from 'react-redux';
import { validateFormFields } from '../../../libs/form-fields-validator'
import { isEmptyArrayOrObject } from '../../../libs/utility-functions';
import { subjectTitle } from '../../../libs/subjects';
// import {subjects} from '../../../libs/subjects';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },

    title: {
        fontSize: 16,
        color: '#ff9800',
        fontStyle: 'italic'
    },
    formField: {
        marginTop: 10,
        marginBottom: 10
    },
}));

export default function StaffProfileData({ staff }) {

    const classes = useStyles();
    const [editNames, isEditNames] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const dispatch = useDispatch();
    const [namesError, setNamesError] = useState(null);
    const { data, isUpdatingStaffData } = staff;

    const initState = {
        first_name: data ? data.first_name : '',
        last_name: data ? data.last_name : '',
        other_names: data ? data.other_names : '',
    };
    const [names, setNames] = useState(initState);

    useEffect(() => {
        if (staff.error) {
            const key = Object.keys(staff.error.message)
            for (const k of key) {
                setNamesError({ ...namesError, [k]: staff.error.message[k] })
            }
            isEditNames(true);
            setIsUpdating(true);
        }
        isEditNames(false);
        setIsUpdating(false);
        setNames(initState);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [staff.error, isUpdatingStaffData, data])
    const handleChange = e => {
        e.preventDefault();
        setNames({
            ...names,
            [e.target.name]: e.target.value
        })
    }

    const handleSumit = (e) => {
        e.preventDefault();
        setNamesError(null);
        const err = validateFormFields(names, {
            first_name: 'min_length',
            last_name: 'min_length',
            other_names: 'min_length',
        }, { optionalFields: ['other_names'], minLength: 3 });
        if (!isEmptyArrayOrObject(err)) {
            setNamesError(err);
        } else {
            dispatch(updateStaffData(names));
            setNamesError(null);
            setIsUpdating(true);
            setNames(initState);
        }
    }

    const cancelEditNames = () => {
        setNames({
            first_name: data ? data.first_name : '',
            last_name: data ? data.last_name : '',
            other_names: data ? data.other_names : '',
        })
        isEditNames(false);
        setNamesError(null);
    }

    return (
        <Container >
            <Typography component='h5' variant='subtitle1' align='right'>
                Joined on:
                <Typography component='em' variant='subtitle1' color='secondary' >
                    {new Date(data.join_date).toDateString()}
                </Typography>
            </Typography>
            <Typography component='h5' variant='subtitle1' align='right'>
                Roles:
                {data.roles.map(
                    (role, index) => {
                        if (index < data.roles.length - 1)
                            return <Typography key={role} component='em' variant='subtitle1' color='primary' > {`${role}, `} </Typography>
                        else
                            return <Typography key={role} component='em' variant='subtitle1' color='primary' > {`${role} `} </Typography>
                    })}

            </Typography>
            <Typography component='h5' variant='subtitle1' align='right'>
                Subjects:
                {data.subjects.map(
                    (s, index) => {
                        if (index < data.subjects.length - 1)
                            return <Typography key={s} component='em' variant='subtitle1' style={{ color: 'brown' }} > {`${subjectTitle(s)}, `} </Typography>
                        else
                            return <Typography key={s} component='em' variant='subtitle1' style={{ color: 'brown' }} > {`${subjectTitle(s)} `} </Typography>
                    })}

            </Typography>
            <Typography component='h5' variant='h5' align='center'>
                {data && `${data.last_name} ${data.first_name} ${data.other_names}`}
            </Typography>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary">
                                Name
                            </Typography>
                            {editNames ?
                                <>
                                    <FormControl fullWidth className={classes.formField} >
                                        <TextField
                                            name="last_name"
                                            label="Last Name"
                                            variant="outlined"
                                            required
                                            helperText={(namesError && namesError.last_name) && namesError.last_name}
                                            value={names.last_name}
                                            onChange={handleChange}
                                            disabled={isUpdating}
                                            error={(namesError && namesError.last_name) ? true : false}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth className={classes.formField} >
                                        <TextField
                                            name="first_name"
                                            label="First Name"
                                            variant="outlined"
                                            required
                                            helperText={(namesError && namesError.first_name) && namesError.first_name}
                                            value={names.first_name}
                                            onChange={handleChange}
                                            disabled={isUpdating}
                                            error={(namesError && namesError.first_name) ? true : false}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth className={classes.formField} >
                                        <TextField
                                            name="other_names"
                                            label="Other Names"
                                            variant="outlined"
                                            value={names.other_names}
                                            onChange={handleChange}
                                            disabled={isUpdating}
                                            error={(namesError && namesError.other_names) ? true : false}
                                            helperText={(namesError && namesError.other_names) && namesError.other_names}
                                        />
                                    </FormControl>
                                </>
                                : (data.first_name !== '' && data.last_name !== '') &&
                                <Typography component='div' align='center'>
                                    <Typography color="textSecondary" component='span' >
                                        {data && `${data.last_name}, ${data.first_name} ${data.other_names}`}
                                    </Typography>
                                    <IconButton
                                        color='primary'
                                        edge='end'
                                        onClick={() => isEditNames(true)}
                                        disabled={isUpdating}
                                    >
                                        <Hidden xsDown>
                                            <Typography variant='body1' component='span'>
                                                Edit
                                            </Typography>
                                        </Hidden>
                                        <EditIcon />
                                    </IconButton>
                                </Typography>
                            }
                            {(data.last_name === '' && !editNames) &&
                                <Typography component='div' align='center'>
                                    <Typography component='span'>
                                        Please provide your name
                                    </Typography>
                                    <IconButton
                                        color='primary'
                                        edge='end'
                                        onClick={() => isEditNames(true)}
                                        disabled={isUpdating}
                                    >
                                        <Hidden xsDown>
                                            <Typography variant='body1' component='span'>
                                                {data.last_name === '' ? 'Add Names' : 'Edit'}
                                            </Typography>
                                        </Hidden>
                                        <EditIcon />
                                    </IconButton>
                                </Typography>
                            }
                        </CardContent>
                        <CardActions>
                            {
                                editNames &&
                                <>
                                    <IconButton
                                        edge='end'
                                        color='primary'
                                        onClick={cancelEditNames}
                                        disabled={isUpdating}
                                    >
                                        <Hidden xsDown>
                                            <Typography variant='body1' component='span'>
                                                Cancel
                                            </Typography>
                                        </Hidden>
                                        <CancelIcon />
                                    </IconButton>
                                    <IconButton
                                        color='primary'
                                        edge='end'
                                        onClick={handleSumit}
                                        disabled={isUpdating}
                                    >
                                        <Hidden xsDown>
                                            <Typography variant='body1' component='span'>
                                                Send
                                            </Typography>
                                        </Hidden>
                                        <SendIcon />
                                    </IconButton>
                                </>
                            }

                        </CardActions>
                    </Card>
                </Grid>
                <StaffProfileContentHelper
                    staff={staff}
                    fieldLabel='Email'
                    fieldType='email'
                    fieldName='email'
                    title='Email'
                    titleStyle={classes.title}
                    rootStyle={classes.root}
                />
                <StaffProfileContentHelper
                    staff={staff}
                    fieldLabel='Username'
                    fieldType='text'
                    fieldName='username'
                    title='Username'
                    titleStyle={classes.title}
                    rootStyle={classes.root}
                />
                <StaffProfileContentHelper
                    staff={staff}
                    fieldLabel='Mobile Phone Numder'
                    fieldType='tel'
                    fieldName='phone_number'
                    title='Phone Number'
                    titleStyle={classes.title}
                    rootStyle={classes.root}
                />
                {/* <StaffProfileContentHelper
                    staff={staff}
                    fieldLabel='Mobile Phone Numder'
                    // fieldType='tel'
                    fieldName='subjects'
                    title='Subjects'
                    titleStyle={classes.title}
                    rootStyle={classes.root}
                    multipleSelect
                    labelId='st-subjets'
                    listOptions={subjects}
                /> */}
            </Grid>
        </Container>
    )
}
