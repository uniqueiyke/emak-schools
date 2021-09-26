import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import StudentsTableHeadData from './StudentsTableHeadData';
import StudentsTableBodyData from './StudentsTableBodyData';
import TablePagination from '@material-ui/core/TablePagination';
import { IconButton } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

const useStyles = makeStyles({
  root:{
    position: 'relative',
  },
  tableContainer: {
    overflow: 'scroll',
    width: '100%',
    height: 400,
  },
  addBtn: {
    position: 'fixed',
    bottom: '40%',
    right: '10vw',
    zIndex: 10,
    color: '#f3ef1c',
  }
});

const StudentsTable = ({ studentsData }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = (path) => {
    history.push(path)
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table aria-label="students table">
          <TableHead className={classes.thead}>
            <StudentsTableHeadData />
          </TableHead>
          <TableBody>
            {
              studentsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((studentData, index) => <StudentsTableBodyData
                key={studentData._id}
                studentData={studentData}
                index={index}
                onClick={() => handleClick(`/admin/students/student/profile/${studentData._id}`)}
              />)
            }
          </TableBody>
        </Table>
        <IconButton onClick={() => handleClick('/admin/add-student')} className={classes.addBtn}> <AddCircleOutlineOutlinedIcon /> </IconButton>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 50, 100, { label: 'All', value: studentsData.length }]}
        component="div"
        count={studentsData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default StudentsTable;