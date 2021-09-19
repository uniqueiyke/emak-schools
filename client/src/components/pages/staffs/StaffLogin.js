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
import PersonIcon from '@material-ui/icons/Person';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { Link as RouteLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { isEmptyString, isEmptyObject } from '../../../libs/utility-functions';
import FormFieldsValidator from '../../../libs/form-fields-validator';
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router';
import { loginStaff } from '../../../redux/actions/staff-action';
import MessageAlert from '../../other-components/MessageAlert';

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

const StaffLogin = () => {

  const styles = useStyle();
  const dispatch = useDispatch()

  const initialDataState = {
    password: '',
    username: ''
  };

  const { staff } = useSelector(state => state.staff);

  const [loginData, setRegData] = useState(initialDataState);
  const [showPassword, setShowPassword] = useState(false);

  const [formSubmitErr, setFormSubmitErr] = useState(null);

  const handleDataChange = (e) => {
    setRegData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  }

  const handleMouseDownPassword = e => {
    e.preventDefault();
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formFieldsValidator = new FormFieldsValidator(loginData)
    formFieldsValidator.field('username').trim().isLength({ minLength: 8 }).withMessage('username is too short');
    formFieldsValidator.field('password').isPasswordStrong().withMessage('This password is too weak. Your password should have at least one upper case leter, one lower case letter, one nomber and one special character');
    const errors = formFieldsValidator.errorMessage();

    if (isEmptyObject(errors)) {
      dispatch(loginStaff(loginData))
      setFormSubmitErr(null);
      setRegData(initialDataState);
    } else {
      setFormSubmitErr(errors);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={styles.paper}>
      {staff.error && <MessageAlert error={staff.error} >
        {
          staff.error.message ? staff.error.message : ''
        }
      </MessageAlert>
      }
      {staff.data && <Redirect to='/staff/data/dashboard' />}
      <Avatar className={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
      <form onSubmit={handleSubmit} noValidate>
        <FormControl fullWidth className={styles.formField}>
          <TextField
            name="username"
            label="Username"
            value={loginData.username}
            onChange={handleDataChange}
            variant="outlined"
            required
            autoComplete="email"
            autoFocus
            InputProps={{
              startAdornment: <InputAdornment position="start"><PersonIcon className={styles.iconColor} /></InputAdornment>
            }}
            error={(formSubmitErr && formSubmitErr.username) ? !isEmptyString(formSubmitErr.username) : false}
            helperText={(formSubmitErr && formSubmitErr.username) && formSubmitErr.username}
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
            value={loginData.password}
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
              <Link component={RouteLink} to='/staffs/confirm-email' variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
      </form>
      </div>
    </Container>
  )
}

export default StaffLogin;
