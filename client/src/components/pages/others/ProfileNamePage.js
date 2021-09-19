import React, { useState, useEffect } from 'react';
import {
    TextField,
    FormControl,
    Typography,
    IconButton,
    Grid,
    Card,
    CardActions,
    CardContent,
    Hidden,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import SendIcon from '@material-ui/icons/Send';
import { useDispatch } from 'react-redux';
import { validateFormFields } from '../../../libs/form-fields-validator'
import { isEmptyArrayOrObject } from '../../../libs/utility-functions';
import { updateStudentData } from '../../../redux/actions/student-action';

const ProfileNamePage = ({
    profileData, rootStyle, titleStyle,
    title, error,
}) => {

    const { data } = profileData;
    const [editMode, isEditMode] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [value, setValue] = useState({
        first_name: data ? data.name.first_name : '',
        last_name: data ? data.name.last_name : '',
        other_names: data ? data.name.other_names : '',
    });
    const [valueError, setValueError] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if(profileData.error){
            const key = Object.keys(profileData.error.message)
            for(const k of key){
                setValueError({...valueError, [k]: profileData.error.message[k]})
            }
        }
        isEditMode(false);
        setIsDisabled(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profileData.error])

    const handleValueChange = e => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    }

    const cancelEditValue = () => {
        setValue({
            first_name: data ? data.name.first_name : '',
            last_name: data ? data.name.last_name : '',
            other_names: data ? data.name.other_names : '',
        });
        isEditMode(false);
        setValueError(null);
    }

    const handleSumit = e => {
        e.preventDefault();
        setValueError(null);
        const err = validateFormFields(value, {
            first_name: 'min_length',
            last_name: 'min_length',
            other_names: 'min_length',
        }, {optionalFields: ['other_names'], minLength: 3});
        if (!isEmptyArrayOrObject(err)) {
            setValueError(err);
        } else {
            dispatch(updateStudentData(value, data._id));
            setIsDisabled(true);
            setValueError(null);
            setValue({
                first_name: data ? data.name.first_name : '',
                last_name: data ? data.name.last_name : '',
                other_names: data ? data.name.other_names : '',
            })
            isEditMode(false);
            setIsDisabled(false)
        }
    }

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card className={rootStyle}>
                <CardContent>
                    <Typography className={titleStyle} color="textSecondary">
                        {title}
                    </Typography>
                    {editMode ?
                        <>
                            <FormControl fullWidth >
                                <TextField
                                    name='last_name'
                                    label='Last Name'
                                    variant="outlined"
                                    required
                                    helperText={(valueError && valueError.last_name) && valueError.last_name}
                                    value={value.last_name}
                                    onChange={handleValueChange}
                                    error={(valueError && valueError.last_name) ? true : false}
                                    disabled={isDisabled}
                                    type='text'
                                />
                            </FormControl>
                            <FormControl fullWidth >
                                <TextField
                                    name='first_name'
                                    label='First Name'
                                    variant="outlined"
                                    required
                                    helperText={(valueError && valueError.first_name) && valueError.first_name}
                                    value={value.first_name}
                                    onChange={handleValueChange}
                                    error={(valueError && valueError.first_name) ? true : false}
                                    disabled={isDisabled}
                                    type='text'
                                />
                            </FormControl>
                            <FormControl fullWidth >
                                <TextField
                                    name='other_names'
                                    label='Other Names'
                                    variant="outlined"
                                    helperText={(valueError && valueError.other_names) && valueError.other_names}
                                    value={value.other_names}
                                    onChange={handleValueChange}
                                    error={(valueError && valueError.other_names) ? true : false}
                                    disabled={isDisabled}
                                    type='text'
                                />
                            </FormControl>
                        </>
                        :
                        <Typography component='div' align='center'>
                            <Typography color="textSecondary" component='span'>
                                {data && `${data.name.last_name}, ${data.name.first_name} ${data.name.other_names}`}
                            </Typography>
                            <IconButton
                                color='primary'
                                edge='end'
                                onClick={() => isEditMode(true)}
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
                    {(data.name.last_name === '' && !editMode) &&
                        <Typography component='div' align='center'>
                            <Typography component='span'>
                                Please provide your name
                            </Typography>
                            <IconButton
                                color='primary'
                                edge='end'
                                onClick={() => isEditMode(true)}
                            >
                                <Hidden xsDown>
                                    <Typography variant='body1' component='span'>
                                        {data.name.last_name === '' ? 'Add Names' : 'Edit'}
                                    </Typography>
                                </Hidden>
                                <EditIcon />
                            </IconButton>
                        </Typography>
                    }
                </CardContent>
                <CardActions>
                    {
                        editMode &&
                        <>
                            <IconButton
                                edge='end'
                                color='primary'
                                onClick={cancelEditValue}
                                disabled={isDisabled}
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
                                disabled={isDisabled}
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
    )
}

export default ProfileNamePage;
