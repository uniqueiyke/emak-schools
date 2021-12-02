import React from 'react';
import Typography from '@material-ui/core/Typography';
import checkAuth from '../../auth-components/CheckAuth';
// import  Button from '@material-ui/core/ Button';
// import { useHistory } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { Link as RouteLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GoToButton from '../../other-components/GoToButton';
import useWaitForDataReady from '../../../hooks/useWaitForDataReady';
import DataFetchingProgress from '../../other-components/DataFetchingProgress';

function StaffDashboard() {
    const { staff } = useSelector(state => state.staff);
    const { data } = staff;
    const isDataReady = useWaitForDataReady(data);

    if (staff.isFetchingStaff || !isDataReady) {
        return <DataFetchingProgress />
    }
    else {
        return (
            <>
                {(data && (data.roles.includes('admin') || data.roles.includes('super-admin'))) && <GoToButton to='/admin/admin-panel'>AdminPanel</GoToButton>}
                <Typography variant='h3'>Staff Dashboard</Typography>
                {/* <div><Link component={RouteLink} to='/staff/dashboard/grade-book' >Add score</Link></div> */}
                <div><Link component={RouteLink} to='/staff/dashboard/add/grade-book' >GradeBook</Link></div>
            </>
        )
    }
}
export default checkAuth(StaffDashboard)