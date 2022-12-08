import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { isEmptyArrayOrObject, setPageTitle } from '../../../libs/utility-functions';
import checkStaffRegToken from '../../auth-components/CheckStaffRegToken';
import Errors from '../../other-components/Errors';
import { Redirect } from 'react-router-dom';
import AlertMessage from '../../other-components/AlertMessage';
import StaffRegForm from './StaffRegForm';

const StaffRegistration = ({ data, error, token }) => {

  setPageTitle('Staff Registration')
  const { staff } = useSelector(state => state.staff);
  const staffErr = staff.error;

  const [regError, setRegError] = useState(null);

  //check for error during registration
  useEffect(() => {
    if (staffErr) {
      setRegError(staffErr)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staffErr])

  return (
    <>
      {!data || isEmptyArrayOrObject(data) ? <Errors errors={error} /> :
        <>
          {(regError && regError.isError && regError.errorType === 'registration-failed') && <AlertMessage severity='error' open={regError.isError} onClose={setRegError(null)} >
            {
              `${regError.errorMsg.message.email ? regError.errorMsg.message.email : ''} 
        ${regError.errorMsg.message.phone_number ? regError.errorMsg.message.phone_number : ''} 
        ${regError.errorMsg.message.username ? regError.errorMsg.message.username : ''}`
            }
          </AlertMessage>
          }
          {staff.data && <Redirect to='/staff/data/profile' />}
          <StaffRegForm data={data} isRegCode={true} token={token} />
        </>
      }
    </>
  )
}

export default checkStaffRegToken(StaffRegistration);
