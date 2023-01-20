import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Parent from '../parents/Parent';
import StudentProfile from './StudentProfile';
import DataFetchingProgress from '../../other-components/DataFetchingProgress';
import { fetchStudent } from '../../../redux/actions/student-action';
import { IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AddParent from '../parents/AddParent';
import Address from '../others/Address';
import MultiPageWidget from '../../other-components/tab/MultiPageWidget';
import TabWrapper from '../../other-components/tab/TabWrapper';
import Tab from '../../other-components/tab/Tab';
import TabPanelContainer from '../../other-components/tab/TabPanelContainer';
import TabPanel from '../../other-components/tab/TabPanel';
import { drawerWidth } from '../../../libs/css-constants';
import { updateStudentData } from '../../../redux/actions/student-action';

const useStyle = makeStyles(theme => ({
    backBtn: {
        position: 'fixed',
        bottom: '25vh',
        right: '10vw',
        zIndex: 10,
        color: 'purple',
    },
    root: {
        position: 'relative',
        marginTop: '33px',
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

const StudentDashboard = () => {
    const { id } = useParams();
    const history = useHistory();

    const classes = useStyle();
    const dispatch = useDispatch();
    const [currentIndex, setCurrentIndex] = useState(0)
    const { student } = useSelector(state => state.student);
    useEffect(() => {
        if (id) {
            dispatch(fetchStudent(id))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    if (student.isFetchingStudents || (!student.data && !student.error)) {
        return (
            <DataFetchingProgress />
        )
    } else {
        return (
            <div className={classes.root}>
                <MultiPageWidget>
                    <TabWrapper top={66} height={'40px'} className={classes.offset} onIndexChange={index => setCurrentIndex(index)}>
                        <Tab active={currentIndex === 0} index={0}>Student Data</Tab>
                        <Tab active={currentIndex === 1} index={1}>Student Address</Tab>
                        <Tab active={currentIndex === 2} index={2}>Parent Data</Tab>
                    </TabWrapper>
                    <TabPanelContainer marginTop={'40px'}>
                        <TabPanel index={0} currentIndex={currentIndex}>
                            <StudentProfile student={student} />
                        </TabPanel>
                        <TabPanel index={1} currentIndex={currentIndex}>
                            {
                                student.data.res_home_address ? <Address
                                    addressLabel={'Residential Address'}
                                    address={student.data.res_home_address}
                                    id={student.data._id}
                                    onUpdate={updateStudentData}
                                    addressType='res_home'
                                />
                                    : <></>
                            }
                            {
                                student.data.pemt_home_address ? <Address
                                    addressLabel={'Permanent Home Address'}
                                    address={student.data.pemt_home_address}
                                    id={student.data._id}
                                    onUpdate={updateStudentData}
                                    addressType='pert_home'
                                />
                                    : <></>
                            }
                        </TabPanel>
                        <TabPanel index={2} currentIndex={currentIndex}>
                            {
                                student.data.parent_id ? <Parent tablabel="Parent Data" parent={student.data.parent_id} />
                                    : <AddParent student_id={student.data._id} />
                            }
                        </TabPanel>
                    </TabPanelContainer>
                </MultiPageWidget>
                <IconButton onClick={() => history.push('/admin/current-students/list')} className={classes.backBtn}> <ArrowBackIosIcon /> </IconButton>
            </div>
        )
    }
}

export default StudentDashboard