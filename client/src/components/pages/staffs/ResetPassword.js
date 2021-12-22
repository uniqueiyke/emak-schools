import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PersonIcon from '@material-ui/icons/Person';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { Link as RouteLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { isEmptyString, isEmptyArrayOrObject, setPageTitle } from '../../../libs/utility-functions';
import { validateFormFields } from '../../../libs/form-fields-validator';
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router';
import { resetPassword } from '../../../redux/actions/staff-action';
import AlertMessage from '../../other-components/AlertMessage';
import { Typography } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  formField: {
    marginBottom: 10
  },
  errorTextColor: {
    color: '#ee1111'
  },
  iconColor: {
    color: '#008800'
  },
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const ResetPassword = () => {

  setPageTitle('Password Reset');
  const styles = useStyle();
  const dispatch = useDispatch()

  const initialDataState = {
    password: '',
    reset_code: '',
    password_match: ''
  };

  const { staff } = useSelector(state => state.staff);
  const { error } = staff;
  const [resetPW, setResetPW] = useState(initialDataState);
  const [showPassword, setShowPassword] = useState(false);

  const [formSubmitErr, setFormSubmitErr] = useState(null);

  const [passwordResetError, setPasswordResetError] = useState(null);

  useEffect(() => {
    if (error) {
      setPasswordResetError(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  const handleDataChange = (e) => {
    setResetPW({
      ...resetPW,
      [e.target.name]: e.target.value
    });
  }

  const handleMouseDownPassword = e => {
    e.preventDefault();
  };

  const handleSubmit = e => {
    e.preventDefault();

    const errors = validateFormFields(resetPW, {
      password: 'password',
      password_match: 'password_match',
      reset_code: '',
    });
    
    if (isEmptyArrayOrObject(errors)) {
      dispatch(resetPassword(resetPW))

      setResetPW(initialDataState);
      setFormSubmitErr(null);
    } else {
      setFormSubmitErr(errors);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <div className={styles.paper}>
        {(passwordResetError && passwordResetError.isError && passwordResetError.errorType === 'password-reset-failed') &&
          <AlertMessage severity='error'
            open={passwordResetError.isError}
            onClose={() => setPasswordResetError(null)}
          >
            {
              passwordResetError.errorMsg.message && passwordResetError.errorMsg.message
            }
          </AlertMessage>
        }
        <Typography align='center'>An email has been to your emial box. Use the provide code to reset your password</Typography>
        {(staff.data && staff.data._id) && <Redirect to='/staff/data/dashboard' />}
        <Avatar className={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <form onSubmit={handleSubmit} noValidate>
          <FormControl fullWidth className={styles.formField}>
            <TextField
              name="reset_code"
              label="Rest Code"
              value={resetPW.reset_code}
              onChange={handleDataChange}
              variant="outlined"
              required
              type="number"
              autoFocus
              InputProps={{
                startAdornment: <InputAdornment position="start"><PersonIcon className={styles.iconColor} /></InputAdornment>
              }}
              error={(formSubmitErr && formSubmitErr.reset_code) ? !isEmptyString(formSubmitErr.reset_code) : false}
              helperText={(formSubmitErr && formSubmitErr.reset_code) && formSubmitErr.reset_code}
            />
          </FormControl>
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
              value={resetPW.password}
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
              labelWidth={78}
            />
            <FormHelperText error >{(formSubmitErr && formSubmitErr.password) && formSubmitErr.password}</FormHelperText>
          </FormControl>
          <FormControl
            className={styles.formField}
            variant="outlined"
            required
            error={(formSubmitErr && formSubmitErr.password_match) ? !isEmptyString(formSubmitErr.password_match) : false}
            fullWidth>
            <InputLabel htmlFor="password_match">Password Match</InputLabel>
            <OutlinedInput
              id="password_match"
              name="password_match"
              type={showPassword ? 'text' : 'password'}
              value={resetPW.password_match}
              onChange={handleDataChange}
              required
              error={(formSubmitErr && formSubmitErr.password_match) ? !isEmptyString(formSubmitErr.password_match) : false}
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
              labelWidth={135}
            />
            <FormHelperText error >{(formSubmitErr && formSubmitErr.password_match) && formSubmitErr.password_match}</FormHelperText>
          </FormControl>
          <Button variant="contained"
            color="primary" type="submit"
            endIcon={<SendIcon />}
            className={styles.submit}
            fullWidth
          >
            Send
          </Button>
          <Grid container>
            <Grid item xs>
              <Link component={RouteLink} to='/staffs/login' variant="body2">
                login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default ResetPassword;
