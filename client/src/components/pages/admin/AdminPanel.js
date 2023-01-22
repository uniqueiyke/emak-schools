import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SendStaffRegToken from './SendStaffRegToken';
import ComputeResult from '../../grade-book/ComputeResult';
import { isAdmin } from '../../../libs/client-page-auth';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SessionTermClassModal from '../../grade-book/SessionTermClassModal';
import { setPageTitle } from '../../../libs/utility-functions';
import CardFormModal from '../../scratch-cards/CardFormModal';
import DashBoardButtonImg from '../../other-components/DashBoardButtonImg';
import subjectList1 from '../../../images/subject-list.png';
import subjectList from '../../../images/subject-list1.png';
import { updateStudentClass } from '../../../redux/actions/admin-action';
import MessageModalDailog from '../../other-components/MessageModalDailog';
import MessageAlert from '../../other-components/MessageAlert';
import MultiPageWidget from '../../other-components/tab/MultiPageWidget';
import TabWrapper from '../../other-components/tab/TabWrapper';
import TabPanelContainer from '../../other-components/tab/TabPanelContainer';
import { drawerWidth } from '../../../libs/css-constants';
import Tab from '../../other-components/tab/Tab';
import TabPanel from '../../other-components/tab/TabPanel';
import AllParents from './AllParents';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },

    bullet: {
        display: 'inline-block',
        margin: '0px 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: '14px',
    },
    pos: {
        marginBottom: '12px',
    },
    btnDiv: {
        margin: '0px 10px',
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
        gridTemplateColumns: 'auto auto',
        gap: theme.spacing(3),
        color: '#562fab',
        border: 'solid 1px',
        borderColor: '#562fab',

    },
    offset: {
        left: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        [theme.breakpoints.down('xs')]: {
            left: 0,
            width: '100%',
            top: 58,
        },
    },
    divMargin: {
        margin: '10px 0px',
    }
}));

export default function AdminPanel() {
    setPageTitle('Admin-Panel');

    const classes = useStyles();
    const [studentClassModalOpen, setStudentClassModalOpen] = useState(false);
    const [subjectListModalOpen, setSubjectListModalOpen] = useState(false);
    const [cardFormModalOpen, setCardFormModalOpen] = useState(false);
    const [classUpdateModalOpen, setClassUpdateModalOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0)
    const history = useHistory();
    const dispatch = useDispatch();
    const { data, error } = useSelector(state => state.admin.updateClass)

    const isSuperAdmin = isAdmin(true);

    const updateClasses = () => {
        dispatch(updateStudentClass())
        setClassUpdateModalOpen(false)
    }

    return (
        <div className={classes.root}>
            <MultiPageWidget>
                <TabWrapper top={66} height={'40px'} className={classes.offset} onIndexChange={index => setCurrentIndex(index)}>
                    <Tab active={currentIndex === 0} index={0}>Staff Registration</Tab>
                    {isSuperAdmin && <>
                        <Tab active={currentIndex === 1} index={1}>Result Management</Tab>
                        <Tab active={currentIndex === 2} index={2}>Card Management</Tab>
                    </>}
                    <Tab active={currentIndex === (isSuperAdmin ? 3 : 1)} index={isSuperAdmin ? 3 : 1}>Others</Tab>
                </TabWrapper>
                <TabPanelContainer marginTop={'40px'}>
                    <TabPanel index={0} currentIndex={currentIndex}>
                        <SendStaffRegToken />
                    </TabPanel>
                    {isSuperAdmin && <>
                        <TabPanel index={1} currentIndex={currentIndex}>
                            <div className={classes.divMargin}>
                                <Button variant='outlined' className={classes.btnDiv} onClick={() => setStudentClassModalOpen(true)}>Student In Class</Button>
                                <SessionTermClassModal path="/admin/students/class-termly" open={studentClassModalOpen} onClose={() => setStudentClassModalOpen(false)}>
                                    Get list of students in the selected class, term and session
                                </SessionTermClassModal>
                            </div>
                            <div className={classes.divMargin}>
                                <DashBoardButtonImg
                                    onClick={() => setSubjectListModalOpen(true)}
                                    src1={subjectList}
                                    src2={subjectList1}
                                >List of Subjects</DashBoardButtonImg>
                                <SessionTermClassModal path="/admin/students/class/termly/subjects" open={subjectListModalOpen} onClose={() => setSubjectListModalOpen(false)}>
                                    Get list of subjects offered by students in the selected class, term and session
                                </SessionTermClassModal>
                            </div>
                            <div className={classes.divMargin}>
                                <Button variant='outlined' className={classes.btnDiv} onClick={() => setClassUpdateModalOpen(true)}>Update Student Class</Button>
                                <MessageModalDailog
                                    open={classUpdateModalOpen}
                                    onClose={() => setClassUpdateModalOpen(false)}
                                    acceptAction={updateClasses}
                                    rejectAction={() => setClassUpdateModalOpen(false)}
                                    variant='warning'
                                >
                                    Do you really want to update the student classes.
                                    <br />
                                    The update action cannot be undo.
                                    Click ok button to continue
                                </MessageModalDailog>
                            </div>
                            <ComputeResult />
                        </TabPanel>
                        <TabPanel index={2} currentIndex={currentIndex}>
                            <div className={classes.divMargin}>
                                <Button variant='outlined' className={classes.btnDiv} onClick={() => setCardFormModalOpen(true)}>Generate Scratch Card Details</Button>
                                <CardFormModal
                                    open={cardFormModalOpen}
                                    onClose={() => setCardFormModalOpen(false)}
                                />
                            </div>
                            <div className={classes.divMargin}>
                                <Button variant='outlined' className={classes.btnDiv} onClick={() => history.push('/admin/avaliable/scratch-cards')}>Fetch Avaliable Cards</Button>
                            </div>
                            <div className={classes.divMargin}>
                                <Button variant='outlined' className={classes.btnDiv} onClick={() => history.push('/admin/all/scratch-cards')}>Fetch All Cards</Button>
                            </div>
                            <div className={classes.divMargin}>
                                <MessageAlert
                                    error={error}
                                    data={data}
                                >{
                                        (data && data.message) ? data.message
                                            : (error && error.message) && error.message
                                    }</MessageAlert>
                            </div>
                        </TabPanel>
                    </>
                    }
                    <TabPanel index={isSuperAdmin ? 3 : 1} currentIndex={currentIndex}>
                        <AllParents />
                    </TabPanel>
                </TabPanelContainer>
            </MultiPageWidget>
        </div>
    )
}
