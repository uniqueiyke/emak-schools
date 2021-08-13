import React, { useState } from 'react';
// import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
// import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
// import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { isEmptyString, isEmptyObject, registerStaff } from '../../libs/utility-functions';
import FormFieldsValidator from '../../libs/form-fields-validator';



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
const StaffRegForm = () => {

  const styles = useStyle();


  const initialDataState = {
    last_name: '',
    first_name: '',
    gender: 'male',
    password: '',
    password_match: '',
    username: '',
    email: '',
    phone_number: ''
  };

  const [regData, setRegData] = useState(initialDataState);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordMatch, setShowPasswordMatch] = useState(false);
  // const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  
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
    formFieldsValidator.field('last_name').trim().isLength({minLength: 3}).withMessage('Name is too short');
    formFieldsValidator.field('first_name').trim().isLength({minLength: 3}).withMessage('Name is too short');
    formFieldsValidator.field('username').trim().isLength({minLength: 8}).withMessage('username is too short');
    formFieldsValidator.field('email').trim().isValidEmail({minLength: 3}).withMessage('Please enter a valid email address');
    formFieldsValidator.field('password_match').isStringMatch(regData.password, regData.password_match)
    .withMessage('The password did not match');
    formFieldsValidator.field('password').isPasswordStrong().withMessage('This password is too weak. Your password should have at least one upper case leter, one lower case letter, one nomber and one special character');
    const errors = formFieldsValidator.errorMessage();
    if(isEmptyObject(errors)){
      console.log(regData);
      registerStaff(regData)
      .then(s => console.log('success',s))
      .catch(e => console.log('failure', e));
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
        <TextField
          name="last_name"
          label="Last Name"
          value={regData.last_name}
          required
          onChange={handleDataChange}
          variant="outlined"
          InputProps={{
            startAdornment: <InputAdornment position="start"><AccountBoxIcon className={styles.iconColor} /></InputAdornment>
          }}
          error={(formSubmitErr && formSubmitErr.last_name) ? !isEmptyString(formSubmitErr.last_name) : false}
          helperText={(formSubmitErr && formSubmitErr.last_name) && formSubmitErr.last_name}
        />
      </FormControl>
      <FormControl fullWidth className={styles.formField}>
        <TextField
          name="first_name"
          label="First Name"
          value={regData.first_name}
          required
          onChange={handleDataChange}
          variant="outlined"
          InputProps={{
            startAdornment: <InputAdornment position="start"><AccountBoxIcon className={styles.iconColor} /></InputAdornment>
          }}
          error={(formSubmitErr && formSubmitErr.first_name) ? !isEmptyString(formSubmitErr.first_name) : false}
          helperText={(formSubmitErr && formSubmitErr.first_name) && formSubmitErr.first_name}
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
      <FormControl component="fieldset" className={styles.formField} fullWidth>
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup aria-label="gender" name="gender" value={regData.gender} onChange={handleDataChange}>
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
        </RadioGroup>
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

export default StaffRegForm;
