import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import { useDispatch, useSelector } from 'react-redux';
import { isEmptyString, isEmptyArrayOrObject, formatPhoneNumber } from '../../../libs/utility-functions';
import { validateFormFields } from '../../../libs/form-fields-validator';
import { classes, bloodGroups, genotypes } from '../../../libs/students-data'
import SingleSelect from '../../other-components/SingleSelect';
import ParentsData from './ParentsData';
import { registerStudent } from '../../../redux/actions/student-action';
import MessageAlert from '../../other-components/MessageAlert';


const useStyle = makeStyles({
  formField: {
    marginTop: 10,
    marginBottom: 10
  },
  iconColor: {
    color: '#008800',
},
})
const StudentRegForm = () => {

  const styles = useStyle();
  const dispatch = useDispatch();
  const { data, error } = useSelector(state => state.student.student);

  const initialDataState = {
    last_name: '',
    first_name: '',
    other_names: '',
    gender: 'male',
    reg_class: '',
    date_of_birth: '',
    genotype: '',
    blood_group: '',
    parent_last_name: '',
    parent_first_name: '',
    parent_phone_number: '',
    parent_email: '',
    last_sch_attend: '',
    parent_occpation: ''
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
    const regDataErr = validateFormFields(regData, {
      last_name: 'min_length',
      first_name: 'min_length',
      other_names: 'min_length',
      gender: 'select',
      reg_class: 'select',
      date_of_birth: 'date',
      genotype: 'select',
      blood_group: 'select',
      parent_last_name: 'min_length',
      parent_first_name: 'min_length',
      parent_phone_number: 'phone',
      parent_email: 'email',
      last_sch_attend: 'min_length',
      parent_occpation: 'min_length'
    }, {optionalFields: ['parent_email', 'date_of_birth', 'blood_group', 'genotype', 'other_names', 'last_sch_attend', 'parent_occpation'], minLength: 3});
    if (isEmptyArrayOrObject(regDataErr)) {
      dispatch(registerStudent({
        ...regData,
        parent_phone_number: formatPhoneNumber(regData.parent_phone_number)
      }));
      setRegData(initialDataState)
      setFormSubmitErr(null)
    } else {
      setFormSubmitErr(regDataErr)
    }
  }

  return (
    <>
    {
    !isEmptyArrayOrObject(error) ? 
    <MessageAlert error >{error.message ? error.message : error.statusText ? error.statusText : ''}</MessageAlert> :
    !isEmptyArrayOrObject(data) ? 
    <MessageAlert data >{`Student registered. Reg. No. ${data.reg_number}. Name ${data.name.last_name} ${data.name.first_name}`}</MessageAlert> : <></>
    }
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
          error={(formSubmitErr && formSubmitErr.other_names) ? !isEmptyString(formSubmitErr.other_names) : false}
          helperText={(formSubmitErr && formSubmitErr.other_names) && formSubmitErr.other_names}
        />
      </FormControl>
      <FormControl component="fieldset" className={styles.formField} variant='outlined'>
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup aria-label="gender" name="gender" value={regData.gender} onChange={handleDataChange}>
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
        </RadioGroup>
      </FormControl>
      <SingleSelect
        listOptions={classes}
        className={styles.formField}
        name="reg_class"
        label="Select enrolment class"
        labelId="classes"
        onChange={handleDataChange}
        value={regData.reg_class}
        required
        error={(formSubmitErr && formSubmitErr.reg_class) ? true : false}
        helperText={(formSubmitErr && formSubmitErr.reg_class) && formSubmitErr.reg_class}
      />
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
          required
        error={(formSubmitErr && formSubmitErr.date_of_birth) ? true : false}
        helperText={(formSubmitErr && formSubmitErr.date_of_birth) && formSubmitErr.date_of_birth}
        />
      </FormControl>
      <SingleSelect
        listOptions={bloodGroups}
        className={styles.formField}
        name="blood_group"
        label="Select Your blood group"
        labelId="bloodgroup"
        onChange={handleDataChange}
        value={regData.blood_group}
        required
        error={(formSubmitErr && formSubmitErr.blood_group) ? true : false}
        helperText={(formSubmitErr && formSubmitErr.blood_group) && formSubmitErr.blood_group}
      />
      <SingleSelect
        listOptions={genotypes}
        className={styles.formField}
        name="genotype"
        label="Select Your blood genotype"
        labelId="genotype"
        onChange={handleDataChange}
        value={regData.genotype}
        required
        error={(formSubmitErr && formSubmitErr.genotype) ? true : false}
        helperText={(formSubmitErr && formSubmitErr.genotype) && formSubmitErr.genotype}
      />
      <FormControl fullWidth className={styles.formField}>
        <TextField name="last_sch_attend"
          label="Last School Attend"
          value={regData.last_sch_attend}
          onChange={handleDataChange}
          variant="outlined"
          error={(formSubmitErr && formSubmitErr.last_sch_attend) ? !isEmptyString(formSubmitErr.last_sch_attend) : false}
          helperText={(formSubmitErr && formSubmitErr.last_sch_attend) && formSubmitErr.last_sch_attend}
        />
      </FormControl>
      <fieldset>
        <legend>Parents/Guardian Data</legend>
        <ParentsData 
        handleDataChange={handleDataChange} 
        styles={styles} 
        parentData={regData}
        inputErrMsg={formSubmitErr}
         />
      </fieldset>
      <Button variant="contained"
        color="primary" type="submit"
        endIcon={<SendIcon />}
      >
        Send
      </Button>
    </form>
    </>
  )
}

export default StudentRegForm
