import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import StudentsTableHeadData from './StudentsTableHeadData';
import StudentsTableBodyData from './StudentsTableBodyData';

const useStyles = makeStyles({
  table: {
    minWidth: '100%',
  },
  divScroll: {
    scrollBehavior: 'auto',
  }
});

const StudentsTable = ({studentsData}) => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = (path) => {
    history.push(path)
  }
  return (
    <div className={classes.divScroll}>
      <Table className={classes.table} aria-label="students table">
        <TableHead className={classes.thead}>
          <StudentsTableHeadData />
        </TableHead>
        <TableBody>
          {
            studentsData.map((studentData, index) => <StudentsTableBodyData 
            key={studentData._id} 
            studentData={studentData} 
            index={index}
            onClick={() => handleClick(`/admin/students/student/profile/${studentData._id}`)} 
            />)
          }
        </TableBody>
      </Table>
      </div>
  );
}

export default StudentsTable;