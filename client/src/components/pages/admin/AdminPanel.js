import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SendStaffRegToken from './SendStaffRegToken';
import ComputeResult from '../../grade-book/ComputeResult';
import { isAdmin } from '../../../libs/client-page-auth';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import SessionTermClassModal from '../../grade-book/SessionTermClassModal';
import { setPageTitle } from '../../../libs/utility-functions';
import CardFormModal from '../../scratch-cards/CardFormModal';
import { useDispatch } from 'react-redux';
import { fetchScratchCards } from '../../../redux/actions/admin-action';
import DashBoardButtonImg from '../../other-components/DashBoardButtonImg';
import subjectList1 from '../../../images/subject-list.png';
import subjectList from '../../../images/subject-list1.png';

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
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    btnDiv: {
        margin: '0px 10px',
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
        gridTemplateColumns: 'auto auto',
        gap: theme.spacing(3),
        color: '#562fab',
        border: 'solide 1',
        borderColor: '#562fab',

    },
}));

export default function AdminPanel() {
    setPageTitle('Admin-Panel');

    const classes = useStyles();
    const [studentClassModalOpen, setStudentClassModalOpen] = useState(false);
    const [subjectListModalOpen, setSubjectListModalOpen] = useState(false);
    const [cardFormModalOpen, setCardFormModalOpen] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={12} md={6} xl={4}>
                    <SendStaffRegToken />
                </Grid>
                {isAdmin(true) && <>
                    <Grid item xs={12} md={6} xl={4}>
                        <ComputeResult />
                    </Grid>
                    <Grid item xs={12} md={6} xl={4}>
                        <Button variant='outlined' className={classes.btnDiv} onClick={() => setStudentClassModalOpen(true)}>Student In Class</Button>
                        <SessionTermClassModal path="/admin/students/class-termly" open={studentClassModalOpen} onClose={() => setStudentClassModalOpen(false)}>
                            Get list of students in the selected class, term and session
                        </SessionTermClassModal>
                    </Grid>
                    <Grid item xs={12} md={6} xl={4}>
                        <DashBoardButtonImg
                            onClick={() => setSubjectListModalOpen(true)}
                            src1={subjectList}
                            src2={subjectList1}
                        >List of Subjects</DashBoardButtonImg>
                        <SessionTermClassModal path="/admin/students/class/termly/subjects" open={subjectListModalOpen} onClose={() => setSubjectListModalOpen(false)}>
                            Get list of subjects offered by students in the selected class, term and session
                        </SessionTermClassModal>
                    </Grid>
                    <Grid item xs={12} md={6} xl={4}>
                        <Button variant='outlined' className={classes.btnDiv} onClick={() => setCardFormModalOpen(true)}>Generate Scratch Card Details</Button>
                        <CardFormModal
                            open={cardFormModalOpen}
                            onClose={() => setCardFormModalOpen(false)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} xl={4}>
                        <Button variant='outlined' className={classes.btnDiv} onClick={() => {
                            dispatch(fetchScratchCards());
                            history.push('/admin/scratch-cards');
                        }}>Fetch Cards</Button>
                    </Grid>
                </>
                }
            </Grid>
        </div>
    )
}
