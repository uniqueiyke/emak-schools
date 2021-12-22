import React, { useEffect } from 'react';
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
import { gradeBook } from '../../redux/actions/staff-action';
import { useHistory, useLocation } from 'react-router';
import { subjectTitle } from '../../libs/subjects';
import { setPageTitle } from '../../libs/utility-functions';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    // paddingTop: 15,
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
    textDecoration: 'underline',
    color: '#b14456',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  tRow: {
    position: 'relative',
  },
  btnCancel: {
    color: '#003333',
    borderColor: '#003333',
    borderStyle: 'solid',
  },
});

const GradeBook = () => {
  const classes = useStyles();

  const history = useHistory()
  const dispatch = useDispatch();
  const students = useSelector(state => state.staff.students);
  const { data, error } = students;
  const { state } = useLocation();
  const { session, term, class_name, class_stream, subject } = state;

  setPageTitle(`${class_name.toUpperCase()}${class_stream} - ${term.toUpperCase()} - ${session} ${subjectTitle(subject)}`);

  useEffect(() => {
    dispatch(gradeBook({
      session: session.replace('/', '_'),
      term: term,
      class_name: `${class_name}_${class_stream.toLowerCase()}`,
      subject
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {error && <Errors errors={error} goBack />}
      {data && (<>
        <Typography align='center' variant='h5' >{subjectTitle(subject)} GradeBook, {class_name.toUpperCase()} {class_stream.toUpperCase()}</Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="subjects table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tRow}>S/N</TableCell>
                <TableCell align="left" >Reg Number</TableCell>
                <TableCell align="left">Last Name</TableCell>
                <TableCell align="left">First Name</TableCell>
                <TableCell align="left">Fisrt Quiz</TableCell>
                <TableCell align="left">Second Quiz</TableCell>
                <TableCell align="left">Third Quiz</TableCell>
                <TableCell align="left">Continueous Assessment</TableCell>
                <TableCell align="left">Exams</TableCell>
                <TableCell align="left">Total</TableCell>
                <TableCell align="left">Position</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                data && (
                  data.map((stu, i) => (
                    <TableRow className={classes.tRow} key={stu._id} onDoubleClick={() => history.push(`/staff/dashboard/grade-book/student/${stu._id}`, { ...stu, state })}>
                      <TableCell >{i + 1}</TableCell>
                      <TableCell align="left" className={classes.regNumTCell} onClick={() => history.push(`/staff/dashboard/grade-book/student/${stu._id}`, { ...stu, state })} >{stu.reg_number}</TableCell>
                      <TableCell align="left">{stu.name.last_name}</TableCell>
                      <TableCell align="left">{stu.name.first_name} </TableCell>
                      <TableCell align="center" component='td' >{stu.scores.first_quiz}</TableCell>
                      <TableCell align="center" component='td' >{stu.scores.second_quiz}</TableCell>
                      <TableCell align="center" component='td' >{stu.scores.third_quiz}</TableCell>
                      <TableCell align="center" component='td' >{stu.scores.c_a}</TableCell>
                      <TableCell align="center" component='td' >{stu.scores.exam}</TableCell>
                      <TableCell align="center" component='td' >{stu.scores.total}</TableCell>
                      <TableCell align="left" component='td' >{stu.scores.position}</TableCell>
                    </TableRow>
                  ))
                )
              }
            </TableBody>
          </Table>
        </TableContainer >
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

export default GradeBook;
