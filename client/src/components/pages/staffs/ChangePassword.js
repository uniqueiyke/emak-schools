import React, { useState, useEffect } from 'react';
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import CancelIcon from '@material-ui/icons/Cancel';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { isEmptyString, isEmptyArrayOrObject, setPageTitle } from '../../../libs/utility-functions';
import { validateFormFields } from '../../../libs/form-fields-validator';
import { useDispatch } from 'react-redux'
import AlertMessage from '../../other-components/AlertMessage';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { adminRestPassword } from '../../../redux/actions/admin-action';
import { staffRestPassword } from '../../../redux/actions/staff-action';

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

const ChangePassword = ({onCanceled, isAdmin, staffData, pwError, pwData}) => {

  setPageTitle('Password Reset');
  const styles = useStyle();
  const dispatch = useDispatch();

  const setInitialDataState = () => {
    const initialDataState = {
      new_password: '',
      password_match: ''
    };
    if(!isAdmin) {
      initialDataState.old_password = ''
    }

    return initialDataState;
  }

  const [resetPW, setResetPW] = useState(() => setInitialDataState());
  const [showPassword, setShowPassword] = useState(false);
  const [formSubmitErr, setFormSubmitErr] = useState(null);
  const [pwChangeSuccess, setPwChangeSuccess] = useState(false);
  const [pwChangeFailed, setPwChangeFailed] = useState(false);

  useEffect(() => {
    if(pwData && pwData.success) {
      setPwChangeSuccess(true)
    }

    if(pwError && !pwError.success) {
      setPwChangeFailed(true)
    }
  }, [pwData, pwError])

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

    const valdateFields = {
      new_password: 'password',
      password_match: 'password_match',
    };

    if(!isAdmin) {
      valdateFields.old_password = 'password';
    }

    const errors = validateFormFields(resetPW, valdateFields, {password_field_name: 'new_password'});

    if (isEmptyArrayOrObject(errors)) {
      if(isAdmin) {
        dispatch(adminRestPassword({...resetPW, ...staffData}));
      }else {
        dispatch(staffRestPassword({...resetPW, ...staffData}));
      }
      setResetPW(setInitialDataState());
      setFormSubmitErr(null);
    } else {
      setFormSubmitErr(errors);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <div className={styles.paper}>
        {(pwError && !pwError.success ) &&
          <AlertMessage severity='error'
            open={pwChangeFailed}
            onClose={() => setPwChangeFailed(false)}
          >
            {
              pwError && pwError.message
            }
          </AlertMessage>
        }
        {
          (pwData && pwData.success) &&
          <AlertMessage severity='success'
            open={pwChangeSuccess}
            onClose={() => setPwChangeSuccess(false)}
          >
            {
              pwData && pwData.message
            }
          </AlertMessage>
        }
        <Typography align='center'>
          {isAdmin ? "Change the staff's password by providing new password details" 
          : "To change your password, you need to provide the old password and the new passowrd you will like to be using."
          }
        </Typography>
        <Avatar className={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <form onSubmit={handleSubmit} noValidate>
          {!isAdmin && <FormControl
            className={styles.formField}
            variant="outlined"
            required
            error={(formSubmitErr && formSubmitErr.old_password) ? !isEmptyString(formSubmitErr.old_password) : false}
            fullWidth>
            <InputLabel htmlFor="old_password">Old Password</InputLabel>
            <OutlinedInput
              name="old_password"
              type={showPassword ? 'text' : 'password'}
              value={resetPW.old_password}
              onChange={handleDataChange}
              required
              error={(formSubmitErr && formSubmitErr.old_password) ? !isEmptyString(formSubmitErr.old_password) : false}
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
              placeholder="Enter the old password"
            />
            <FormHelperText error >{(formSubmitErr && formSubmitErr.old_password) && formSubmitErr.old_password}</FormHelperText>
          </FormControl>}
          
          <FormControl
            className={styles.formField}
            variant="outlined"
            required
            error={(formSubmitErr && formSubmitErr.new_password) ? !isEmptyString(formSubmitErr.new_password) : false}
            fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="new_password"
              name="new_password"
              type={showPassword ? 'text' : 'password'}
              value={resetPW.new_password}
              onChange={handleDataChange}
              required
              error={(formSubmitErr && formSubmitErr.new_password) ? !isEmptyString(formSubmitErr.new_password) : false}
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
              placeholder="Enter your choice new password"
            />
            <FormHelperText error >{(formSubmitErr && formSubmitErr.new_password) && formSubmitErr.new_password}</FormHelperText>
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
              placeholder="Comfirm new password"
            />
            <FormHelperText error >{(formSubmitErr && formSubmitErr.password_match) && formSubmitErr.password_match}</FormHelperText>
          </FormControl>

          <Grid container>
          <Grid item xs>
              <Button variant="contained"
                color="secondary" type="button"
                endIcon={<CancelIcon />}
                className={styles.submit}
                fullWidth
                onClick={onCanceled}
              >
                cancel
              </Button>
            </Grid>
            <Grid item xs>
              <Button variant="contained"
                color="primary" type="submit"
                endIcon={<SendIcon />}
                className={styles.submit}
                fullWidth
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default ChangePassword;

ChangePassword.propTypes = {
  onCanceled: PropTypes.func
}