import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { useDispatch, useSelector } from 'react-redux';
import MultipleSelect from '../../other-components/MultipleSelect';
import { roles } from '../../../libs/staff-roles';
import { subjects, subjectField } from '../../../libs/subjects';
import { updateStaffRoles, updateStaffSubjects } from '../../../redux/actions/admin-action';
import { setPageTitle } from '../../../libs/utility-functions';
import ChangePassword from './ChangePassword';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    color: 'darkgreen',
  },
  email: {
    marginBottom: 12,
    color: '#546a70',
  },
  roleBtn: {
    cursor: 'pointer',
    color: 'blue',
  }
});


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function UpDateStaffDataDialog({ label, labelId, listOptions, open, onClose, onSubmit, value, onChange, name, dialogTitle }) {
  setPageTitle('Staff List')

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <MultipleSelect
            listOptions={listOptions}
            label={label}
            labelId={labelId}
            onChange={onChange}
            value={value}
            name={name}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
            update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


const Staff = ({ staff }) => {
  const classes = useStyles();
  const [updateRole, setUpdateRole] = useState(false);
  const [rolesValue, setRolesValue] = useState(staff.roles ? staff.roles : []);

  const [updateSubjects, setUpdateSubjects] = useState(false);
  const [subjectsValue, setSubjectsValue] = useState(staff.subjects ? staff.subjects : []);

  const [openResetPassword, toggleResetPassword] = useState(false);
  const dispatch = useDispatch()
  const {data, error} = useSelector(state => state.admin.passwordReset);
  const handleRolesDailogClose = () => {
    setUpdateRole(false);
  }

  const handleRolesSubmit = () => {
    dispatch(updateStaffRoles({ id: staff._id, roles: rolesValue }));
    setRolesValue([]);
    setUpdateRole(false);
  }

  const handleRolesValueChange = e => {
    setRolesValue(e.target.value);
  }

  const handleSubjectsDailogClose = () => {
    setUpdateSubjects(false);
  }

  const handleSubjectsSubmit = () => {
    dispatch(updateStaffSubjects({ id: staff._id, subjects: subjectsValue }));
    setSubjectsValue([]);
    setUpdateSubjects(false);
  }

  const handleSubjectsValueChange = e => {
    setSubjectsValue(e.target.value);
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          {staff.first_name} {staff.last_name}
        </Typography>
        <Typography variant="h6">
          {staff.phone_number}
        </Typography>
        <Typography className={classes.email} color="textSecondary">
          {staff.email}
        </Typography>
        <Typography variant="body1">
          Username:
          <em> {staff.username}</em>
        </Typography>
        <Typography variant="body2" component="p">
          {staff.gender}
        </Typography>
        <Typography component='h5' variant='subtitle1' align='left'>
          Roles:
          {staff.roles.map(
            (role, index) => {
              if (index < staff.roles.length - 1)
                return <Typography key={role} component='em' variant='subtitle1' style={{ color: 'orange' }} > {`${role}, `} </Typography>
              else
                return <Typography key={role} component='em' variant='subtitle1' style={{ color: 'orange' }} > {`${role} `} </Typography>
            })}
          <Link className={classes.roleBtn} onClick={() => setUpdateRole(true)} > update</Link>
          <UpDateStaffDataDialog
            open={updateRole}
            onClose={handleRolesDailogClose}
            onSubmit={handleRolesSubmit}
            onChange={handleRolesValueChange}
            value={rolesValue}
            name='roles'
            label='Staff Roles'
            listOptions={roles}
            labelId='staff-roles'
            dialogTitle={'Update Staff Roles'}
          />
        </Typography>
        <Typography component='h5' variant='subtitle1' align='left'>
          Subjects:
          {staff.subjects.map(
            (s, index) => {
              if (index < staff.subjects.length - 1)
                return <Typography key={s} component='em' variant='subtitle1' style={{ color: 'orange' }} > {`${subjectField(s, 'label')}, `} </Typography>
              else
                return <Typography key={s} component='em' variant='subtitle1' style={{ color: 'orange' }} > {`${subjectField(s, 'label')} `} </Typography>
            })}
          <Link className={classes.roleBtn} onClick={() => setUpdateSubjects(true)} > update</Link>
          <UpDateStaffDataDialog
            open={updateSubjects}
            onClose={handleSubjectsDailogClose}
            onSubmit={handleSubjectsSubmit}
            onChange={handleSubjectsValueChange}
            value={subjectsValue}
            name='subjects'
            label='Subjects'
            listOptions={subjects}
            labelId='subjectsID'
            dialogTitle={"Update Staff Subjects"}
          />
        </Typography>
        <Dialog
          open={openResetPassword}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => {toggleResetPassword(false)}}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>Update Staff Password</DialogTitle>
          <DialogContent>
            <ChangePassword 
            isAdmin={true} 
            onCanceled={() => {toggleResetPassword(false)}} 
            staffData={{
              email: staff.email, 
              phone_number: staff.phone_number,
              username: staff.username,
              id: staff._id
            }}
            pwError={error}
            pwData={data}
            />
          </DialogContent>
          <DialogActions>
          </DialogActions>
        </Dialog>
      </CardContent>
      <CardActions>
        <Link className={classes.roleBtn} onClick={() => toggleResetPassword(true)} > reset staff password</Link>
      </CardActions>
    </Card>
  );
}

export default Staff
