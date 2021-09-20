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
import { isEmptyArrayOrObject, formatPhoneNumber } from '../../../libs/utility-functions';
import SingleSelect from '../../other-components/SingleSelect';
import { updateStudentData } from '../../../redux/actions/student-action';
const ProfileContent = ({
    profileData, rootStyle, titleStyle,
    title, fieldType, fieldName,
    fieldLabel, select,
    listOptions, labelId, onChange, className,
}) => {

    const { data } = profileData;
    const [editMode, isEditMode] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [editValue, setValue] = useState((data && (data[fieldName] !== undefined || data[fieldName] !== 'undefined')) ? data[fieldName]: '');
    const [valueError, setValueError] = useState(null);

    const dispatch = useDispatch();
    const checkVal = data[fieldName];
    
    useEffect(() => {
        if (profileData.error) {
            const key = Object.keys(profileData.error.message)
            const keyValue = key[0];
            setValueError({ [keyValue]: profileData.error.message[keyValue] })
        }
        isEditMode(false);
        setIsUpdating(false);
        setValue(data ? data[fieldName] : '');
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profileData.error, checkVal])

    const handleValueChange = e => {
        setValue(e.target.value);
    }

    const cancelEditValue = () => {
        setValue(data ? data[fieldName] : '');
        isEditMode(false);
        setValueError(null);
    }

    const handleSumit = e => {
        e.preventDefault();
        setValueError(null);
        let err = null;
        if (fieldName === 'email') {
            err = validateFormFields({ [fieldName]: editValue }, { [fieldName]: 'email' });
        }
        else if (fieldName === 'phone_number') {
            err = validateFormFields({ [fieldName]: editValue }, { [fieldName]: 'phone' });
        }
        else {
            err = validateFormFields({ [fieldName]: editValue }, { [fieldName]: '' });
        }

        if (!isEmptyArrayOrObject(err)) {
            setValueError(err);
        } else {
            if (fieldName === 'phone_number') {
                dispatch(updateStudentData({ [fieldName]: formatPhoneNumber(editValue) }, data._id));
            } else {
                dispatch(updateStudentData({ [fieldName]: editValue }, data._id));
            }
            setValueError(null);
            setValue(data ? data[fieldName] : '');
            isEditMode(false);
            setIsUpdating(true);
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
                            {
                                select ?
                                    <SingleSelect
                                        listOptions={listOptions}
                                        labelId={labelId}
                                        helperText={(valueError && valueError[fieldName]) && valueError[fieldName]}
                                        label={fieldLabel}
                                        onChange={handleValueChange}
                                        className={className}
                                        value={editValue}
                                        name={fieldName}
                                        required
                                        error={valueError ? true : false}
                                    />
                                    : <FormControl fullWidth >
                                        <TextField
                                            name={fieldName}
                                            label={fieldLabel}
                                            variant="outlined"
                                            required
                                            helperText={(valueError && valueError[fieldName]) && valueError[fieldName]}
                                            value={editValue}
                                            onChange={handleValueChange}
                                            error={valueError ? true : false}
                                            disabled={isUpdating}
                                            type={fieldType ? fieldType : 'text'}
                                        />
                                    </FormControl>
                            }

                        </>
                        :
                        <Typography component='div' align='center'>
                            <Typography color="textSecondary" component='span'>
                                {data[fieldName]}
                            </Typography>
                            <IconButton
                                disabled={isUpdating}
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
                </CardContent>
                <CardActions>
                    {
                        editMode &&
                        <>
                            <IconButton
                                edge='end'
                                color='primary'
                                onClick={cancelEditValue}
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
    )
}

export default ProfileContent
