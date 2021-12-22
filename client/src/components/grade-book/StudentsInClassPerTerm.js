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
import { fetchStudentsTermly, deleteStudentFromClass } from '../../redux/actions/admin-action';
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
    regNumTCell: {
        position: 'sticky',
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
});

const StudentsInClassPerTerm = () => {
    const classes = useStyles();
    const history = useHistory()
    const location = useLocation();
    const dispatch = useDispatch()

    setPageTitle(`${location.state.class_name.toUpperCase()}${location.state.class_stream} - ${location.state.term.toUpperCase()} - ${location.state.session} Students`);

    const [confirmDelete, setConfirmDelete] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);

    useEffect(() => {

        if (isNotEmptyObject(location.state)) {
            dispatch(fetchStudentsTermly({
                session: location.state.session.replace('/', '_'),
                term: location.state.term,
                class_name: `${location.state.class_name}_${location.state.class_stream.toLowerCase()}`,
            }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleDelete = id => {
        dispatch(deleteStudentFromClass({
            session: location.state.session.replace('/', '_'),
            term: location.state.term,
            class_name: `${location.state.class_name}_${location.state.class_stream.toLowerCase()}`,
        }, { id }));
        setConfirmDelete(false);
        setStudentToDelete(null);
    }

    const shouldDelete = obj => {
        setStudentToDelete(obj);
        setConfirmDelete(true);
    }

    const cancelDelete = () => {
        setStudentToDelete(null);
        setConfirmDelete(false);
    }

    const students = useSelector(state => state.admin.studentsClass);
    const { data, error, isFetchingStudentsClass } = students;

    const parseAge = dob => {
        const dobMs = new Date(dob);
        const currDateMs = new Date();
        const deltaDate = currDateMs - dobMs
        return Math.floor(deltaDate / 31104000000) //(1000 * 60 * 60 * 24 * 30 * 12)
    }

    if (isFetchingStudentsClass) {
        return <DataFetchingProgress />
    } else
        return (
            <>
                {error && <Errors errors={error} goBack />}
                {!isEmptyArrayOrObject(data) && (<>
                    <Typography align='center' variant='h5' >{location.state.class_name.toUpperCase()} {location.state.class_stream} Students, {location.state.term.toUpperCase()} {location.state.session}</Typography>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="subjects table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tRow}>S/N</TableCell>
                                    <TableCell align="left" className={classes.regNumTCell}>Reg Number</TableCell>
                                    <TableCell align="left">Last Name</TableCell>
                                    <TableCell align="left">First Name</TableCell>
                                    <TableCell align="left">Other Names</TableCell>
                                    <TableCell align="left">Gender</TableCell>
                                    <TableCell align="left">Age (Yrs)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    data && (
                                        data.map((stu, i) => (
                                            <TableRow className={classes.tRow} key={stu._id} onDoubleClick={() => history.push('/admin/students/result-slip', { id: stu._id, ...location.state })}>
                                                <TableCell >{i + 1}<DeleteIcon onClick={() => shouldDelete({ id: stu._id, reg_number: stu.reg_number })} className={classes.deleteBtnIcon} /></TableCell>
                                                <TableCell align="left" className={classes.regNumTCell}>{stu.reg_number}</TableCell>
                                                <TableCell align="left">{stu.name.last_name}</TableCell>
                                                <TableCell align="left">{stu.name.first_name} </TableCell>
                                                <TableCell align="left" >{stu.name.other_names}</TableCell>
                                                <TableCell align="left" >{stu.gender}</TableCell>
                                                <TableCell align="left" >{parseAge(stu.date_of_birth)}</TableCell>
                                            </TableRow>
                                        ))
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer >
                    <MessageModalDailog
                        open={confirmDelete}
                        onClose={cancelDelete}
                        acceptAction={() => handleDelete(studentToDelete.id)}
                        rejectAction={cancelDelete}
                        variant='warning'
                    >
                        Are you sure you want to delete the student's record with Reg. Number {(studentToDelete && studentToDelete.reg_number) ? studentToDelete.reg_number : ''}?<br />
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

export default StudentsInClassPerTerm
