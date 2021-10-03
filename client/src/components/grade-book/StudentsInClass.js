import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const StudentsInClass = () => {
  const classes = useStyles();
  const students = useSelector(state => state.staff.students);
  return (
    <TableContainer component={Paper}>
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
            students && (
              students.map((stu, i) => (
                <TableRow key={stu._id}>
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
    </TableContainer >
  );
}

export default StudentsInClass;
