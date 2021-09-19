import React from 'react';
// import Typography from '@material-ui/core/Typography';
import checkAuth from '../../auth-components/CheckAuth';
// import GoToButton from '../../other-components/GoToButton';
import { useSelector } from 'react-redux';
import DataFetchingProgress from '../../other-components/DataFetchingProgress';
import { setPageTitle } from '../../../libs/utility-functions';
import StaffProfileData from './StaffProfileData';
import useWaitForDataReady from '../../../hooks/useWaitForDataReady';

function StaffProfile() {
  const staff = useSelector(state => state.staff);
  const { data } = staff.staff;
  const isDataReady = useWaitForDataReady(data)

  if (staff.isFetchingStaff || !isDataReady) {
    return <DataFetchingProgress />
  }
  else {
    setPageTitle(`${data && data.last_name} Profile`);
    return (
      <>
        <StaffProfileData staff={staff.staff}/>
      </>
    )
  }
}

export default checkAuth(StaffProfile);