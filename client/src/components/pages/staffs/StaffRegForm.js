import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { useDispatch } from 'react-redux'
import { isEmptyString, formatPhoneNumber, isEmptyArrayOrObject, setPageTitle } from '../../../libs/utility-functions';
import { validateFormFields } from '../../../libs/form-fields-validator';
// import Errors from '../../other-components/Errors';
// import { Redirect } from 'react-router-dom';
// import AlertMessage from '../../other-components/AlertMessage';
import PropTypes from 'prop-types';
import MultipleSelect from '../../other-components/MultipleSelect';
import { roles,  } from '../../../libs/staff-roles';

const useStyle = makeStyles({
    formField: {
        marginTop: 10,
        marginBottom: 10
    },
    errorTextColor: {
        color: '#ee1111'
    },
    iconColor: {
        color: '#008800'
    }
})

const StaffRegForm = ({ data, isRegCode, token, onRegister }) => {
    setPageTitle('Staff Registration')
    const styles = useStyle();
    const dispatch = useDispatch()
    const initialDataState = () => {
        const initialStateValue = {
            password: '',
            password_match: '',
            username: '',
            email: '',
            phone_number: '',
        }
        if (isRegCode) { 
            initialStateValue.key_code = '';
        }
        else { 
            initialStateValue.roles = [];
        }
        return initialStateValue;
    };

    const [regData, setRegData] = useState(() => initialDataState());
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordMatch, setShowPasswordMatch] = useState(false);

    const [formSubmitErr, setFormSubmitErr] = useState(null);

    useEffect(() => {
        if (data) {
            setRegData({
                ...regData,
                email: (data && data.email) ? data.email : '',
                phone_number: (data && data.phone_number) ? data.phone_number : '',
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    const handleDataChange = (e) => {
        setRegData({
            ...regData,
            [e.target.name]: e.target.value
        });
    }

    const handleMouseDownPassword = e => {
        e.preventDefault();
    };

    const handleSubmit = e => {
        e.preventDefault();
        const formFields = {
            password: 'password',
            password_match: 'password_match',
            username: 'min_length',
            email: 'email',
            phone_number: 'phone',
            roles: 'array',
        }
        if (isRegCode) { formFields.key_code = '' }

        const errors = validateFormFields(regData, formFields, { minLength: 8 });

        if (isEmptyArrayOrObject(errors)) {
            dispatch(onRegister({
                ...regData,
                phone_number: formatPhoneNumber(regData.phone_number)
            }))

            // console.log(regData);
            setFormSubmitErr(null);
            setRegData(initialDataState);
        } else {
            setFormSubmitErr(errors);
        }
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                noValidate>
                <FormControl fullWidth className={styles.formField}>
                    <TextField name="email"
                        label="Email"
                        type="email"
                        placeholder="Enter a valide email address"
                        value={regData.email}
                        onChange={handleDataChange}
                        variant="outlined"
                        required
                        error={(formSubmitErr && formSubmitErr.email) ? !isEmptyString(formSubmitErr.email) : false}
                        helperText={(formSubmitErr && formSubmitErr.email) && formSubmitErr.email}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><EmailIcon className={styles.iconColor} /></InputAdornment>
                        }}
                    />
                </FormControl>
                <FormControl fullWidth className={styles.formField}>
                    <TextField
                        name="username"
                        label="Username"
                        value={regData.username}
                        placeholder="Choose a username"
                        onChange={handleDataChange}
                        variant="outlined"
                        required
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><PersonIcon className={styles.iconColor} /></InputAdornment>
                        }}
                        error={(formSubmitErr && formSubmitErr.username) ? !isEmptyString(formSubmitErr.username) : false}
                        helperText={(formSubmitErr && formSubmitErr.username) && formSubmitErr.username}
                    />
                </FormControl>
                <FormControl fullWidth className={styles.formField}>
                    <TextField name="phone_number"
                        label="Phone Number"
                        type="tel"
                        placeholder="Enter a valid mobile phone number"
                        value={regData.phone_number}
                        onChange={handleDataChange}
                        variant="outlined"
                        required
                        error={(formSubmitErr && formSubmitErr.phone_number) ? !isEmptyString(formSubmitErr.phone_number) : false}
                        helperText={(formSubmitErr && formSubmitErr.phone_number) && formSubmitErr.phone_number}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><PhoneIcon className={styles.iconColor} /></InputAdornment>
                        }}
                    />
                </FormControl>
                {isRegCode &&
                    <FormControl fullWidth className={styles.formField}>
                        <TextField name="key_code"
                            label="Key"
                            type="number"
                            value={regData.key_code}
                            placeholder="Get this from the email sent to you"
                            onChange={handleDataChange}
                            variant="outlined"
                            required
                            error={(formSubmitErr && formSubmitErr.key_code) ? !isEmptyString(formSubmitErr.key_code) : false}
                            helperText={(formSubmitErr && formSubmitErr.key_code) && formSubmitErr.key_code}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><VpnKeyIcon className={styles.iconColor} /></InputAdornment>
                            }}
                        />
                    </FormControl>
                }
                <FormControl
                    className={styles.formField}
                    variant="outlined"
                    required
                    error={(formSubmitErr && formSubmitErr.password) ? !isEmptyString(formSubmitErr.password) : false}
                    fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={regData.password}
                        placeholder="Choose a stronge password. At least 8 characters with at least one uppercase, lowercase letters, one digit and one special character"
                        onChange={handleDataChange}
                        required
                        error={(formSubmitErr && formSubmitErr.password) ? !isEmptyString(formSubmitErr.password) : false}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    className={styles.iconColor}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={70}
                    />
                    <FormHelperText className={styles.errorTextColor}>{(formSubmitErr && formSubmitErr.password) && formSubmitErr.password}</FormHelperText>
                </FormControl>
                <FormControl
                    className={styles.formField}
                    required
                    error={(formSubmitErr && formSubmitErr.password_match) ? !isEmptyString(formSubmitErr.password_match) : false}
                    variant="outlined"
                    fullWidth>
                    <InputLabel htmlFor="password_match">Confirm Password</InputLabel>
                    <OutlinedInput
                        id="password_match"
                        name="password_match"
                        type={showPasswordMatch ? 'text' : 'password'}
                        value={regData.password_match}
                        placeholder="Confirm your password"
                        required
                        onChange={handleDataChange}
                        error={(formSubmitErr && formSubmitErr.password_match) ? !isEmptyString(formSubmitErr.password_match) : false}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPasswordMatch(!showPasswordMatch)}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    className={styles.iconColor}
                                >
                                    {showPasswordMatch ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={135}
                    />
                    <FormHelperText className={styles.errorTextColor}>{(formSubmitErr && formSubmitErr.password_match) && formSubmitErr.password_match}</FormHelperText>
                </FormControl>
                {!isRegCode &&
                    <MultipleSelect
                        listOptions={roles}
                        label='Select roles'
                        labelId='select'
                        value={regData.roles}
                        name="roles"
                        onChange={handleDataChange}
                        required
                        helperText={(formSubmitErr && formSubmitErr.roles) && formSubmitErr.roles}
                        error={(formSubmitErr && formSubmitErr.roles) ? !isEmptyString(formSubmitErr.roles) : false}
                    />
                }
                <Button variant="contained"
                    color="primary" type="submit"
                    endIcon={<SendIcon />}
                >
                    Send
                </Button>
            </form>
        </div>
    )
}

export default StaffRegForm;

StaffRegForm.propTypes = {
    data: PropTypes.array,
    isRegCode: PropTypes.bool,
    onRegister: PropTypes.func.isRequired,
}