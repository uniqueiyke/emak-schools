import React, { useState, useEffect } from 'react';
import { FormControl, TextField, InputAdornment, Button } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { isEmptyString, isEmptyArrayOrObject } from '../../../libs/utility-functions';
import FormFieldsValidator from '../../../libs/form-fields-validator';
import { confirmEmail } from '../../../redux/actions/staff-action';
import DataFetchingProgress from '../../other-components/DataFetchingProgress'
import { Redirect } from 'react-router-dom'
import AlertMessage from '../../other-components/AlertMessage';
const useStyle = makeStyles(theme => ({
  formField: {
    marginTop: 10,
    marginBottom: 10
  },
  errorTextColor: {
    color: '#ee1111'
  },
  iconColor: {
    color: '#008800'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const ConfirmEmail = () => {
  const styles = useStyle();
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const [formSubmitErr, setFormSubmitErr] = useState(null);
  const { isConfirmingEmail, staff } = useSelector(state => state.staff);
  const { error, data } = staff;
  
  const [emailError, setEmailError] = useState(null);

  useEffect(() => {
    if (error) {
        setEmailError(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [error])

  const handleDataChange = (e) => { setEmail(e.target.value); }
  
  const handleSubmit = e => {
    e.preventDefault();
    const validator = new FormFieldsValidator({ email });
    validator.field('email').isEmpty().withMessage('Please enter the email with which you create the account');
    const error = validator.errorMessage();

    if (isEmptyArrayOrObject(error)) {
      dispatch(confirmEmail({email}));
      setFormSubmitErr(null);
      setEmail('');
    } else {
      setFormSubmitErr(error);
    }
  }

    return (
      <>
      {isConfirmingEmail && <DataFetchingProgress />}
      {(emailError && emailError.isError && emailError.errorType === 'confirm-email-failed') && <AlertMessage severity='error' open={emailError.isError} onClose={() => setEmailError(null)} >{emailError.errorMsg.message ? emailError.errorMsg.message : 'error occured'}</AlertMessage>}
      {data && <Redirect to='/staffs/password/reset'/>}
      <form noValidate onSubmit={handleSubmit}>
        <FormControl fullWidth className={styles.formField}>
          <TextField name="email"
            label="Email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={handleDataChange}
            variant="outlined"
            required
            error={(formSubmitErr && formSubmitErr.email) ? !isEmptyString(formSubmitErr.email) : false}
            helperText={(formSubmitErr && formSubmitErr.email) && formSubmitErr.email}
            InputProps={{
              startAdornment: <InputAdornment position="start"><EmailIcon className={styles.iconColor} /></InputAdornment>
            }}
          />
          <Button variant="contained"
            color="primary" type="submit"
            endIcon={<SendIcon />}
            className={styles.submit}
            fullWidth
            disabled={isConfirmingEmail}
          >
            Send
          </Button>
        </FormControl>
      </form>
      </>
    )
}

export default ConfirmEmail
