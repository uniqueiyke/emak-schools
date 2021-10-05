import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import ResultManager from './ResultManager';
import { currentAcademicYear, currentTerm } from '../../libs/session-array';
import { fecthStudentsInClass } from '../../redux/actions/staff-action';
import { useHistory } from 'react-router';

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
});

const StudentsInClass = () => {
  const classes = useStyles();

  const initialSubmitValueState = {
    session: currentAcademicYear(),
    term: currentTerm(),
    class_name: 'jss1',
    class_stream: 'A',
    subject: '',
  }
  const [state, setState] = useState(initialSubmitValueState);
  const history = useHistory()
  const dispatch = useDispatch();
  const students = useSelector(state => state.staff.students);
  const stuData = students.data;

  const handleValueChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(fecthStudentsInClass({
      session: state.session.replace('/', '_'),
      term: state.term.replace(' ', '_'),
      class_name: `${state.class_name}_${state.class_stream.toLowerCase()}`,
    }))
    setState(initialSubmitValueState);
  }

  return (
    <>
      <ResultManager
        vTerm={state.term}
        vSession={state.session}
        vClass={state.class_name}
        vStream={state.class_stream}
        onValueChange={handleValueChange}
        onSubmit={handleSubmit}
        itemAlign='column'
      />
      <div className={classes.btnDiv}>
        <Button size='small' onClick={handleSubmit} variant='outlined' type='submit' style={{ color: 'forestgreen', borderColor: 'forestgreen' }} startIcon={<AddBoxIcon style={{ color: 'forestgreen' }} />} >
          add
        </Button>
      </div>
      {stuData &&
        (<TableContainer component={Paper}>
          <Table className={classes.table} aria-label="subjects table">
            <TableHead>
              <TableRow>
                <TableCell >S/N</TableCell>
                <TableCell align="right">Reg Number</TableCell>
                <TableCell align="right">Last Name</TableCell>
                <TableCell align="right">First Name</TableCell>
                <TableCell align="right">Other Names</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                stuData && (
                  stuData.students_list.map((stu, i) => (
                    <TableRow key={stu._id} onDoubleClick={() => history.push(`/staff/dashboard/grade-book/student/${stu._id}`, { ...stu })}>
                      <TableCell >{i + 1}</TableCell>
                      <TableCell align="right">{stu.reg_number}</TableCell>
                      <TableCell align="right">{stu.name.last_name}</TableCell>
                      <TableCell align="right">{stu.name.first_name} </TableCell>
                      <TableCell align="right">{stu.name.other_names}</TableCell>
                    </TableRow>
                  ))
                )
              }
            </TableBody>
          </Table>
        </TableContainer >)}

    </>
  );
}

export default StudentsInClass;
