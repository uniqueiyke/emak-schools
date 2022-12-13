import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import checkAuth from '../../auth-components/CheckAuth';
// import  Button from '@material-ui/core/ Button';
import { makeStyles } from '@material-ui/styles';
import Link from '@material-ui/core/Link';
import { Link as RouteLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import GoToButton from '../../other-components/GoToButton';
import useWaitForDataReady from '../../../hooks/useWaitForDataReady';
import DataFetchingProgress from '../../other-components/DataFetchingProgress';
import { isEmptyArray, setPageTitle } from '../../../libs/utility-functions';
import { isAdmin } from '../../../libs/client-page-auth';
import SessionTermClassModal from '../../grade-book/SessionTermClassModal';
import DashBoardButtonImg from '../../other-components/DashBoardButtonImg';
import gradebook2 from '../../../images/gradebook.png';
import gradebook1 from '../../../images/gradebook-form.png';

const useStyles = makeStyles({
    errMsg: {
        color: '#ff2222',
        fontWeight: 'bold',
    },
    toLink: {
        color: 'blue',
    },
    nameTypo: {
        color: '#9ad4ec'
    },
})
function StaffDashboard() {
    setPageTitle('Dashboard');
    const styles = useStyles()
    const { staff } = useSelector(state => state.staff);
    const { data } = staff;
    const isDataReady = useWaitForDataReady(data);
    const [openGradeBookModal, setOpenGradeBookModal] = useState(false);

    if (staff.isFetchingStaff || !isDataReady) {
        return <DataFetchingProgress />
    }
    else {
        return (
            <>
                <Typography className={styles.nameTypo} variant='subtitle2'>{`${data.last_name} ${data.first_name}`}</Typography>

                <Grid container spacing={1}>
                    <Grid item xs={12} md={6} xl={4}>
                        {(data && !isAdmin(true) && data.last_name === '') &&
                            <Typography className={styles.errMsg}>
                                Please add your name to continue.
                                <Link className={styles.toLink} component={RouteLink} to='/staff/data/profile' > Profile</Link>
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
                            <>
                                <DashBoardButtonImg onClick={() => setOpenGradeBookModal(true)}
                                    src1={gradebook1}
                                    src2={gradebook2}
                                >Gradebook</DashBoardButtonImg>
                                <SessionTermClassModal
                                    withSubject
                                    open={openGradeBookModal}
                                    onClose={() => setOpenGradeBookModal(false)}
                                    subjPerTeacher={data.subjects}
                                    path='/staff/dashboard/grade-book'
                                >
                                    <Typography variant='h6' component='span' align='center' >Please select the academic year, term, class and the subject for the GradeBook</Typography>
                                </SessionTermClassModal>
                            </>

                        }
                    </Grid>
                </Grid>
                {(data && (data.roles.includes('admin') || data.roles.includes('super-admin'))) && <GoToButton to='/admin/admin-panel'>AdminPanel</GoToButton>}
            </>
        )
    }
}
export default checkAuth(StaffDashboard)