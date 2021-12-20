import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles'
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import HelpIcon from '@material-ui/icons/Help';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles({
  warning: {
    color: '#ecd60b',
  },
  error: {
    color: '#ce0f0f',
  },
  info: {
    color: '#259fd8',
  },
  help: {
    color: '#2573d8',
  },
  success: {
    color: '#3e862e',
  },
})

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const MessageModalDailog = ({message, acceptAction, rejectAction, onClose, open, variant, ...props}) => {
  const styles = useStyles();  
  
  return (
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={onClose}
          aria-labelledby="message-alert-dialog"
          aria-describedby="message-alert-dialog-description"
        >
          <DialogTitle id="message-alert-dialog">
            {
              variant === "error" ? <span className={styles.error}><ErrorIcon /> Error </span>
              : variant === "warning" ? <span className={styles.warning}><WarningIcon /> Warning</span>
              : variant === "info" ? <span className={styles.info} ><InfoIcon /> Information</span>
              : variant === "help" ? <span className={styles.help}><HelpIcon /> Help</span>
              : <span className={styles.success}><CheckCircleIcon /> Success</span>
            }
            </DialogTitle>
          <DialogContent>
            <DialogContentText id="message-alert-dialog-description">
              {props.children ? props.children : message ? message : ''}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={rejectAction} color="primary">
             Cancel
            </Button>
            <Button onClick={acceptAction} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

export default MessageModalDailog
