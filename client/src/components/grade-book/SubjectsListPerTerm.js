import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Errors from '../other-components/Errors';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import DeleteIcon from '@material-ui/icons/Delete';
import DataFetchingProgress from '../other-components/DataFetchingProgress';
import { isEmptyArrayOrObject, isNotEmptyObject, setPageTitle } from '../../libs/utility-functions'
import { fetchTermlySubjects, deleteSubjectFromClass } from '../../redux/actions/admin-action';
import { subjectTitle } from '../../libs/subjects';
import MessageModalDailog from '../other-components/MessageModalDailog';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    btnDiv: {
        margin: '10px 10px',
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
        gridTemplateColumns: 'auto auto',
        gap: 0,
        color: 'forestgreen',
    },
    tRow: {
        position: 'relative',
    },
    btnCancel: {
        color: '#003333',
        borderColor: '#003333',
        borderStyle: 'solid',
    },
    deleteBtnIcon: {
        color: 'darkred',
        cursor: 'pointer',
        textDecoration: 'underline',
    },
    subjectTitle: {
        color: '#ee5522',
        textDecoration: 'underline',
        cursor: 'pointer',
    },
});

const SubjectsListPerTerm = () => {
    const classes = useStyles();
    const history = useHistory()
    const location = useLocation();

    setPageTitle(`${location.state.class_name.toUpperCase()}${location.state.class_stream} - ${location.state.term.toUpperCase()} - ${location.state.session} Subjects`);

    const dispatch = useDispatch()
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [subjectToDelete, setSubjectToDelete] = useState('');

    useEffect(() => {

        if (isNotEmptyObject(location.state)) {
            dispatch(fetchTermlySubjects({
                session: location.state.session.replace('/', '_'),
                term: location.state.term,
                class_name: `${location.state.class_name}_${location.state.class_stream.toLowerCase()}`,
            }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleDelete = subject => {
        dispatch(deleteSubjectFromClass({
            session: location.state.session.replace('/', '_'),
            term: location.state.term,
            class_name: `${location.state.class_name}_${location.state.class_stream.toLowerCase()}`,
        }, { subject }));
        setConfirmDelete(false);
    }

    const shouldDelete = subject => {
        setSubjectToDelete(subject);
        setConfirmDelete(true);
    }

    const cancelDelete = () => {
        setSubjectToDelete(null);
        setConfirmDelete(false);
    }

    const subjects = useSelector(state => state.admin.classSubjects);
    const { data, error, isFetchingStudentsSubjects } = subjects;

    if (isFetchingStudentsSubjects) {
        return <DataFetchingProgress />
    } else
        return (
            <>
                {error && <Errors errors={error} goBack />}
                {!isEmptyArrayOrObject(data) && (<>
                    <Typography align='center' variant='h5' >Subjects offered by {location.state.class_name.toUpperCase()} {location.state.class_stream} Students, {location.state.term.toUpperCase()} {location.state.session}</Typography>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="subjects table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tRow}>S/N</TableCell>
                                    <TableCell align="left">Subject</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    data && (
                                        data.map((subj, i) => (
                                            <TableRow className={classes.tRow} key={i} >
                                                <TableCell >{i + 1}<DeleteIcon onClick={() => shouldDelete(subj)} className={classes.deleteBtnIcon} /></TableCell>
                                                <TableCell align="left" ><span className={classes.subjectTitle} onClick={() => history.push(`/staff/dashboard/grade-book/${subj}`, { ...location.state, subject: subj })}>{subjectTitle(subj)}</span></TableCell>
                                            </TableRow>
                                        ))
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer >
                    <MessageModalDailog
                        open={confirmDelete}
                        onClose={() => cancelDelete()}
                        acceptAction={() => handleDelete(subjectToDelete)}
                        rejectAction={() => cancelDelete()}
                        variant='warning'
                    >
                        Are you sure you want to delete {subjectTitle(subjectToDelete)}?<br />
                        Know that this action cannot be undo. Once deleted, all the data will be lost and cannot be retrived back.
                    </MessageModalDailog>
                </>)}
                <Button
                    variant='outlined'
                    className={classes.btnCancel}
                    size='small'
                    onClick={() => history.goBack()}
                >Go Back
                </Button>
            </>
        );
}

export default SubjectsListPerTerm
