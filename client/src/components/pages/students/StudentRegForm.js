import React, { useState } from 'react';
// import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { isEmptyString, isEmptyObject, registerStudent } from '../../../libs/utility-functions';
import FormFieldsValidator from '../../libs/form-input-validator';



const useStyle = makeStyles({
  formField: {
    marginTop: 10,
    marginBottom: 10
  }
})
const StudentRegForm = () => {

  const styles = useStyle();


  const initialDataState = {
    last_name: '',
    first_name: '',
    other_names: '',
    gender: 'male',
    reg_class: '',
    date_of_birth: ''
  };

  const [regData, setRegData] = useState(initialDataState);
  const [formSubmitErr, setFormSubmitErr] = useState(null);
  const handleDataChange = (e) => {
    setRegData({
      ...regData,
      [e.target.name]: e.target.value
    });
  }
  
  const handleSubmit = e => {
    e.preventDefault();
    const formFieldsValidator = new FormFieldsValidator(regData);
    formFieldsValidator.field('last_name').trim().isLength({minLength: 3}).withMessage('The name is too short. Please supply a valid name');
    formFieldsValidator.field('first_name').trim().isLength({minLength: 3}).withMessage('The name is too short. Please supply a valid name');
    formFieldsValidator.field('reg_class').trim().isLength({minLength: 3}).withMessage('Please select the class of registration');

    const regDataErr = formFieldsValidator.errorMessage(regData);
    if (isEmptyObject(regDataErr)) {
      registerStudent(regData)
      .then(data => console.log(data))
      .catch(err => console.log('error', err));
      setRegData(initialDataState)
      setFormSubmitErr(null)
    } else {
      console.log(regDataErr);
      setFormSubmitErr(regDataErr)
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
          error={(formSubmitErr && formSubmitErr.first_name) ? !isEmptyString(formSubmitErr.first_name) : false}
          helperText={(formSubmitErr && formSubmitErr.first_name) && formSubmitErr.first_name}
        />
      </FormControl>
      <FormControl fullWidth className={styles.formField}>
        <TextField name="other_names"
          label="Other Names"
          value={regData.other_names}
          onChange={handleDataChange}
          variant="outlined"
        />
      </FormControl>
      <FormControl component="fieldset" className={styles.formField}>
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup aria-label="gender" name="gender" value={regData.gender} onChange={handleDataChange}>
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
        </RadioGroup>
      </FormControl>
      <FormControl fullWidth component="fieldset"
        error={(formSubmitErr && formSubmitErr.reg_class) ? !isEmptyString(formSubmitErr.reg_class) : false}
        variant="outlined"
        className={styles.formField}
      >
        <FormLabel component="legend" >Select Class You are to be enroled</FormLabel>
        <Select
          name="reg_class"
          value={regData.reg_class}
          required
          onChange={handleDataChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="jss 1">JSS 1</MenuItem>
          <MenuItem value="jss 2">JSS 2</MenuItem>
          <MenuItem value="jss 3">JSS 3</MenuItem>
          <MenuItem value="ss 1">SS 1</MenuItem>
          <MenuItem value="ss 2">SS 2</MenuItem>
          <MenuItem value="ss 3" >SS 3</MenuItem>
        </Select>
        <FormHelperText>{(formSubmitErr && formSubmitErr.reg_class) && formSubmitErr.reg_class}</FormHelperText>
      </FormControl>
      <FormControl className={styles.formField} fullWidth>
        <TextField
          name="date_of_birth"
          label="Date Of Birth"
          value={regData.date_of_birth}
          type="date"
          variant="outlined"
          onChange={handleDataChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
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

export default StudentRegForm
