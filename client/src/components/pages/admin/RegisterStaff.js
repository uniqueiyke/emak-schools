import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import StaffRegForm from '../staffs/StaffRegForm';
import { adminRegisterStaff } from '../../../redux/actions/admin-action';
import AlertMessage from '../../other-components/AlertMessage';

function RegisterStaff() {
  const initErrorState = { isError: false, error: null }
  const [newRegErr, setNewRegErr] = useState(initErrorState);
  const [newStaffReg, setNewStaffReg] = useState(false);
  const [newStaffD, setNewStaffD] = useState(null);
  const { data, error, isAdminRegisterstaff } = useSelector(state => state.admin.staffs);

  useEffect(() => {
    if (error) {
      setNewRegErr({ isError: true, error: error })
    }
    if (data && isAdminRegisterstaff) {
      setNewStaffReg(isAdminRegisterstaff);
      setNewStaffD(data[data.length - 1])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, isAdminRegisterstaff])

  return (
    <>
      {
        newRegErr.isError &&
        <AlertMessage severity='error' open={newRegErr.isError} onClose={() => setNewRegErr(initErrorState)} >
          <Typography>{ `${newRegErr.error.message}` }</Typography>
        </AlertMessage>
      }
      {newStaffReg &&
        <AlertMessage severity='success' open={newStaffReg} onClose={() => setNewStaffReg(false)} >
          <Typography>A staff with the credentials {`username: ${newStaffD.username}, Email: ${newStaffD.email} and Phone Number: ${newStaffD.phone_number}`} has been added to the list of staffs.</Typography>
        </AlertMessage>
      }
      <StaffRegForm onRegister={adminRegisterStaff} />
    </>
  )
}

export default RegisterStaff;