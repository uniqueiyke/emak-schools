import React from 'react';
import Typography from '@material-ui/core/Typography';
import checkAuth from '../../auth-components/CheckAuth';
// import  Button from '@material-ui/core/ Button';
import { makeStyles } from '@material-ui/styles';
import Link from '@material-ui/core/Link';
import { Link as RouteLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GoToButton from '../../other-components/GoToButton';
import useWaitForDataReady from '../../../hooks/useWaitForDataReady';
import DataFetchingProgress from '../../other-components/DataFetchingProgress';
import { isEmptyArray } from '../../../libs/utility-functions';
import { isAdmin } from '../../../libs/client-page-auth';


const useStyles = makeStyles({
    errMsg: {
        color: '#ff2222',
        fontWeight: 'bold',
    },
    toLink: {
        color: 'blue',
    },
})
function StaffDashboard() {
    const styles = useStyles()
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
                {(data && !isAdmin(true) && data.last_name === '') &&
                    <Typography className={styles.errMsg}>
                        Please add your name to continue.
                        <Link className={styles.toLink} component={RouteLink} to='/staff/profile' > Profile</Link>
                    </Typography>
                }
                {(data && !isAdmin(true) && isEmptyArray(data.subjects)) &&
                    <Typography className={styles.errMsg}>
                        You have not been asigned any subject. Please contact the exam admistrator to do so. Thanks
                        <Link className={styles.toLink} component={RouteLink} to='/staff/data/profile' > Profile</Link>
                    </Typography>
                }
                {
                    ((!isEmptyArray(data.subjects) && data.last_name !== '') || isAdmin(true)) &&
                    <Link component={RouteLink} to={{
                        pathname: '/staff/dashboard/add/grade-book',
                        state: { subjects: data.subjects }
                      }} >GradeBook</Link>
                }
            </>
        )
    }
}
export default checkAuth(StaffDashboard)