import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SendStaffRegToken from './SendStaffRegToken';
import ComputeResult from '../../grade-book/ComputeResult';
import { isAdmin } from '../../../libs/client-page-auth';
import Button from '@material-ui/core/Button';
import StudentsClassTermModal from '../../grade-book/StudentsClassTermModal';

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
}));

export default function AdminPanel() {
    const classes = useStyles();
    const [studentClassModalOpen, setStudentClassModalOpen] = useState(false);
    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={12} md={6} xl={4}>
                    <SendStaffRegToken />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                    {isAdmin(true) && <ComputeResult />}
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                    {isAdmin(true) &&
                        <>
                            <Button onClick={() => setStudentClassModalOpen(true)}>Student In Class</Button>
                            <StudentsClassTermModal open={studentClassModalOpen} onClose={() => setStudentClassModalOpen(false)} />
                        </>
                    }
                </Grid>
            </Grid>
        </div>
    )
}
