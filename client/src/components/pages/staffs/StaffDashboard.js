import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import checkAuth from '../../auth-components/CheckAuth';
// import  Button from '@material-ui/core/ Button';
import { makeStyles } from '@material-ui/core/styles';
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
import MultiPageWidget from '../../other-components/tab/MultiPageWidget';
import TabWrapper from '../../other-components/tab/TabWrapper';
import Tab from '../../other-components/tab/Tab';
import TabPanelContainer from '../../other-components/tab/TabPanelContainer';
import TabPanel from '../../other-components/tab/TabPanel';
import { drawerWidth } from '../../../libs/css-constants';
import StaffProfileData from './StaffProfileData';
import Address from '../others/Address';

const useStyles = makeStyles(theme => ({
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
    offset: {
        left: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        [theme.breakpoints.down('xs')]: {
            left: 0,
            width: '100%',
            top: 58,
        },
    }
}))
function StaffDashboard() {
    setPageTitle('Dashboard');
    const styles = useStyles()
    const { staff } = useSelector(state => state.staff);
    const [currentIndex, setCurrentIndex] = useState(0)
    const { data } = staff;
    const isDataReady = useWaitForDataReady(data);
    const [openGradeBookModal, setOpenGradeBookModal] = useState(false);
    
    if (staff.isFetchingStaff || !isDataReady) {
        return <DataFetchingProgress />
    }
    else {
        return (
            <>
                <MultiPageWidget>
                    <TabWrapper top={66} height={'40px'} className={styles.offset} onIndexChange={index => setCurrentIndex(index)}>
                        <Tab active={currentIndex === 0} index={0}>Result Area</Tab>
                        <Tab active={currentIndex === 1} index={1}>Personal Data</Tab>
                        <Tab active={currentIndex === 2} index={2}>Address</Tab>
                    </TabWrapper>
                    <TabPanelContainer marginTop={'35px'}>
                        <Typography className={styles.nameTypo} variant='subtitle2'>{`${data.last_name} ${data.first_name}`}</Typography>
                        <TabPanel index={0} currentIndex={currentIndex}>
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
                        </TabPanel>
                        <TabPanel index={1} currentIndex={currentIndex}>
                            <StaffProfileData staff={staff} />
                        </TabPanel>
                        <TabPanel index={2} currentIndex={currentIndex}>
                        <Address
                                    addressLabel={'Address'}
                                    address={data.address}
                                    id={data._id}
                                    // onUpdate={updateStudentData}
                                />
                        </TabPanel>
                    </TabPanelContainer>
                </MultiPageWidget>


            </>
        )
    }
}
export default checkAuth(StaffDashboard)