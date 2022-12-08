import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import SendIcon from '@material-ui/icons/Send';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { isEmptyString, formatPhoneNumber, isEmptyArrayOrObject } from '../../../libs/utility-functions';
import { validateFormFields } from '../../../libs/form-fields-validator';

import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { generateCodeOfLenth } from '../../../libs/gen-api-key';
import { sendStaffRegistrationToken } from '../../../redux/actions/admin-action';
import AlertMessage from '../../other-components/AlertMessage';
import MultipleSelect from '../../other-components/MultipleSelect';
import { roles } from '../../../libs/staff-roles'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        borderColor: '#d68710',
        borderStyle: 'solid',
        borderWidth: 1,
    },
    title: {
        fontSize: 20,
        color: '#eb5e0d',
        textAlign: 'center',
    },
    formField: {
        marginTop: 10,
        marginBottom: 10
    },
    iconColor: {
        color: '#008800',
    },
    cardAction: {
        backgroundColor: '#d68710',
    },
    cardActionBtnSend: {
        color: '#9e7a04',
        backgroundColor: '#30d5eb',
        '& :hover': {
            color: '#30d5eb',
        },
    },
    cardActionBtnGen: {
        color: "#87e1ec",
        backgroundColor: 'brown',
        '& :hover': {
            color: 'brown',
        },
    },
}));

export default function SendStaffRegDetails() {

    const initialDataState = {
        email: '',
        phone_number: '',
        roles: [],
    };

    const initServerError = { isError: false, errorMsg: null };

    const { data, error } = useSelector(state => state.admin.staffRegPassport);
    const { staff } = useSelector(state => state.staff);
    const [regData, setRegData] = useState(initialDataState);
    const [formSubmitErr, setFormSubmitErr] = useState(null);
    const [serverError, setServerError] = useState(initServerError);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [keyCode, setKeyCode] = useState('');

    useEffect(() => {
        if (error) {
            setServerError({ isError: error.is_error, errorMsg: error.error_msg })
        }
        if (data) {
            setIsSuccessful(data.is_successful)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, error])

    const filterRoles = () => {
        if (staff.data && staff.data.roles.includes('super-admin'))
            return roles;
        return roles.filter(item => (item.value !== 'super-admin' && item.value !== 'admin' && item.value !== 'bursar') && item)
    }
    const handleDataChange = (e) => {
        setRegData({
            ...regData,
            [e.target.name]: e.target.value
        });
    }

    const dispatch = useDispatch();
    const generateKeyCode = () => {
        generateCodeOfLenth(8, 'nu')
            .then(code => {
                setKeyCode(code);
            }).catch(err => { throw err });
    }

    const handleSubmit = e => {
        e.preventDefault();
        const errors = validateFormFields(
            { ...regData, key_code: keyCode },
            {
                email: 'email',
                phone_number: 'phone',
                roles: 'array',
                key_code: '',
            }
        );

        if (isEmptyArrayOrObject(errors)) {
            const data = {
                ...regData,
                phone_number: formatPhoneNumber(regData.phone_number),
                key_code: keyCode
            }
            dispatch(sendStaffRegistrationToken(data));
            setFormSubmitErr(null);
            setRegData(initialDataState);
            setKeyCode('');
        } else {
            // console.log(errors);
            setFormSubmitErr(errors);
        }
    }

    const classes = useStyles();
    return (
        <>
            <Card className={classes.root}>
                <CardContent>
                    {(serverError && serverError.isError) &&
                        <AlertMessage
                            severity='error'
                            open={serverError.isError}
                            onClose={() => setServerError(initServerError)}
                        >
                            {serverError.errorMsg.message}
                        </AlertMessage>
                    }
                    {isSuccessful &&
                        <AlertMessage
                            severity='success'
                            open={isSuccessful}
                            onClose={() => setIsSuccessful(false)}
                        >
                            {`A mail has been sent to ${data.email}`}
                        </AlertMessage>
                    }
                    <Typography className={classes.title} gutterBottom>
                        Send Staff Registration Code
                    </Typography>
                    <Divider />
                    <FormControl fullWidth className={classes.formField}>
                        <TextField name="phone_number"
                            label="Phone Number"
                            type="tel"
                            value={regData.phone_number}
                            onChange={handleDataChange}
                            variant="outlined"
                            required
                            error={(formSubmitErr && formSubmitErr.phone_number) ? !isEmptyString(formSubmitErr.phone_number) : false}
                            helperText={(formSubmitErr && formSubmitErr.phone_number) && formSubmitErr.phone_number}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><PhoneIcon className={classes.iconColor} /></InputAdornment>
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth className={classes.formField}>
                        <TextField name="email"
                            label="Email"
                            type="email"
                            value={regData.email}
                            onChange={handleDataChange}
                            variant="outlined"
                            required
                            error={(formSubmitErr && formSubmitErr.email) ? !isEmptyString(formSubmitErr.email) : false}
                            helperText={(formSubmitErr && formSubmitErr.email) && formSubmitErr.email}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><EmailIcon className={classes.iconColor} /></InputAdornment>
                            }}
                        />
                    </FormControl>
                    <MultipleSelect
                        listOptions={filterRoles()}
                        label='Select roles'
                        labelId='select'
                        value={regData.roles}
                        name="roles"
                        onChange={handleDataChange}
                        required
                        helperText={(formSubmitErr && formSubmitErr.roles) && formSubmitErr.roles}
                        error={(formSubmitErr && formSubmitErr.roles) ? !isEmptyString(formSubmitErr.roles) : false}
                    />
                    <FormControl fullWidth className={classes.formField}>
                        <TextField
                            name="key_code"
                            label="Key"
                            value={keyCode}
                            onChange={handleDataChange}
                            variant="outlined"
                            required
                            aria-readonly='true'
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><VpnKeyIcon className={classes.iconColor} /></InputAdornment>
                            }}
                            error={(formSubmitErr && formSubmitErr.key_code) ? !isEmptyString(formSubmitErr.key_code) : false}
                            helperText={(formSubmitErr && formSubmitErr.key_code) && formSubmitErr.key_code}
                        />
                    </FormControl>
                </CardContent>
                <CardActions className={classes.cardAction}>
                    <Button
                        onClick={handleSubmit}
                        endIcon={<SendIcon />}
                        className={classes.cardActionBtnSend}
                    >Send</Button>
                    <Button
                        onClick={generateKeyCode}
                        endIcon={<DonutLargeIcon />}
                        className={classes.cardActionBtnGen}
                    >Generate Key Code</Button>

                </CardActions>
            </Card>
        </>
    )
}
