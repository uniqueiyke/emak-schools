import React, { useState } from 'react';
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
import { isEmptyString, isEmptyObject, formatPhoneNumber, staffToJoinRequest } from '../../../libs/utility-functions';
import FormFieldsValidator from '../../../libs/form-fields-validator';



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
const StaffRegRequestForm = () => {

  const styles = useStyle();


  const initialDataState = {
    password: '',
    password_match: '',
    username: '',
    email: '',
    phone_number: ''
  };

  const [regData, setRegData] = useState(initialDataState);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordMatch, setShowPasswordMatch] = useState(false);
  
  const [formSubmitErr, setFormSubmitErr] = useState(null);

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
    const formFieldsValidator = new FormFieldsValidator(regData)
    formFieldsValidator.field('username').trim().isLength({minLength: 8}).withMessage('username is too short');
    formFieldsValidator.field('email').trim().isValidEmail({minLength: 3}).withMessage('Please enter a valid email address');
    formFieldsValidator.field('password_match').isStringMatch(regData.password, regData.password_match).withMessage('The password did not match');
    formFieldsValidator.field('password').isPasswordStrong().withMessage('This password is too weak. Your password should have at least one upper case leter, one lower case letter, one nomber and one special character');
    const errors = formFieldsValidator.errorMessage();

    const formatedPhoneNumber = formatPhoneNumber(regData.phone_number);
    if(!formatedPhoneNumber){
      errors['phone_number'] = 'Please enter a valid phone number';
    }
    if(isEmptyObject(errors)){
      staffToJoinRequest({
        ...regData,
        phone_number: formatedPhoneNumber
      })
      .then(s => console.log('success',s))
      .catch(e => console.log('failure', e));
      // console.log(regData);
      setFormSubmitErr(null);
      setRegData(initialDataState);
    }else{
      console.log(errors);
      setFormSubmitErr(errors);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FormControl fullWidth className={styles.formField}>
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
            startAdornment: <InputAdornment position="start"><EmailIcon className={styles.iconColor} /></InputAdornment>
          }}
        />
      </FormControl>
      <FormControl fullWidth className={styles.formField}>
        <TextField 
        name="username"
          label="Username"
          value={regData.username}
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
      <FormControl className={styles.formField} variant="outlined" fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={regData.password}
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
        <FormControl className={styles.formField} variant="outlined" fullWidth>
          <InputLabel htmlFor="password_match">Confirm Password</InputLabel>
          <OutlinedInput
            id="password_match"
            name="password_match"
            type={showPasswordMatch ? 'text' : 'password'}
            value={regData.password_match}
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
      <Button variant="contained"
        color="primary" type="submit"
        endIcon={<SendIcon />}
      >
        Send
      </Button>
    </form>
  )
}

export default StaffRegRequestForm;
