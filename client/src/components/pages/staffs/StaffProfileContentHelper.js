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
import { updateStaffData } from '../../../redux/actions/staff-action';
import { useDispatch } from 'react-redux';
import { validateFormFields } from '../../../libs/form-fields-validator'
import { isEmptyArrayOrObject, formatPhoneNumber } from '../../../libs/utility-functions';
import SingleSelect from '../../other-components/SingleSelect';
import MultipleSelect from '../../other-components/MultipleSelect';
import { subjectTitle } from '../../../libs/subjects'

const StaffProfileContentHelper = ({
    staff, rootStyle, titleStyle,
    title, fieldType, fieldName,
    fieldLabel, error, singleSelect, multipleSelect,
    listOptions, labelId
}) => {

    const { data, isUpdatingStaffData } = staff;
    const [editMode, isEditMode] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [value, setValue] = useState(data ? data[fieldName] : '');
    const [valueError, setValueError] = useState(null);

    const dispatch = useDispatch();
    const checkVal = data[fieldName];
    useEffect(() => {
        if (staff.error) {
            const key = Object.keys(staff.error.message)
            const keyValue = key[0];
            setValueError({ [keyValue]: staff.error.message[keyValue] })
        }
        setValue(data ? data[fieldName] : '');
        isEditMode(false);
        setIsUpdating(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [staff.error, checkVal, isUpdatingStaffData]);

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
            err = validateFormFields({ [fieldName]: value }, { [fieldName]: 'email' });
        }
        if (fieldName === 'phone_number') {
            err = validateFormFields({ [fieldName]: value }, { [fieldName]: 'phone' });
        }
        if (fieldName === 'username') {
            err = validateFormFields({ [fieldName]: value }, { [fieldName]: 'min_length' }, { minLength: 8 });
        }

        if (!isEmptyArrayOrObject(err)) {
            setValueError(err);
        } else {
            setIsUpdating(true);
            if (fieldName === 'phone_number') {
                dispatch(updateStaffData({ [fieldName]: formatPhoneNumber(value) }));
            } else {
                dispatch(updateStaffData({ [fieldName]: value }));
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
                            {singleSelect ?
                                <SingleSelect
                                    listOptions={listOptions}
                                    labelId={labelId}
                                    helperText={(valueError && valueError[fieldName]) && valueError[fieldName]}
                                    label={fieldLabel}
                                    onChange={handleValueChange}
                                    value={value}
                                    name={fieldName}
                                    required
                                    error={valueError ? true : false}
                                />
                                : multipleSelect
                                    ?
                                    <MultipleSelect
                                        listOptions={listOptions}
                                        labelId={labelId}
                                        helperText={(valueError && valueError[fieldName]) && valueError[fieldName]}
                                        label={fieldLabel}
                                        onChange={handleValueChange}
                                        value={value}
                                        name={fieldName}
                                        required
                                        error={valueError ? true : false}
                                    /> :

                                    <FormControl fullWidth >
                                        <TextField
                                            name={fieldName}
                                            label={fieldLabel}
                                            variant="outlined"
                                            required
                                            helperText={(valueError && valueError[fieldName]) && valueError[fieldName]}
                                            value={value}
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
                                {
                                    !data[fieldName] ? <Typography color='error' >{`Please provide your ${fieldName}`}</Typography>
                                        : multipleSelect ? data[fieldName].map(
                                            (s, index) => {
                                                if (index < data[fieldName].length - 1)
                                                    return <Typography key={s} component='em' variant='subtitle1' style={{ color: 'brown' }} > {`${subjectTitle(s)}, `} </Typography>
                                                else
                                                    return <Typography key={s} component='em' variant='subtitle1' style={{ color: 'brown' }} > {`${subjectTitle(s)} `} </Typography>
                                            })
                                            : data[fieldName]
                                }


                            </Typography>
                            <IconButton
                                color='primary'
                                edge='end'
                                onClick={() => isEditMode(true)}
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

export default StaffProfileContentHelper
