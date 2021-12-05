import React, { forwardRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { PropTypes } from 'prop-types';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const WrongInclusionDailog = ({ open, onClose, wrongInclusion, onSend, classname }) => {

  const dailogMessage = () => {
    const str = wrongInclusion.join(', ');
    if (wrongInclusion.length === 1) {
      return `The student with the following Reg. Number ${str} is not a member of the ${classname} class. HE/She has been removed from the list. Would you like to continue with the GradeBook creation? If yes, click SEND to continue or CANCEL to go back.`;
    } else {
      return `The students with the following Reg. Numbers ${str} are not members of the ${classname} class. They have been removed from the list. Would you like to continue with the GradeBook creation? If yes, click SEND to continue or CANCEL to go back`;
    }
  }
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-labelledby="wrong-student-title"
        aria-describedby="wrong-student-description"
      >
        <DialogTitle id="wrong-student-title">{"Possibly wrong students inclusion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="awrong-student-description">
            {dailogMessage()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSend} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default WrongInclusionDailog;

WrongInclusionDailog.proptype = {
  open: PropTypes.bool, 
  onClose: PropTypes.func, 
  wrongInclusion: PropTypes.func,
  onSend: PropTypes.func, 
  classname: PropTypes.string,
}
