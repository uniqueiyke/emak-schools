import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import FilterTableToolBar from './FilterTableToolBar';
import { isEmptyArrayOrObject } from '../../../libs/utility-functions';
import Popper from '@material-ui/core/Popper';
import StudentsTableHeadData from './StudentsTableHeadData';
import StudentsTableBodyData from './StudentsTableBodyData';

import { sortKeysMap, getComparator, stableSort } from '../../../libs/sort-n-filter';

const useStyles = makeStyles(theme => ({
  paper: {
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: 'green',
    color: '#ffffff',
  },
  root: {
    position: 'relative',
  },
  tableContainer: {
    overflow: 'scroll',
    width: '100%',
    maxHeight: 400,
  },
  addBtn: {
    position: 'fixed',
    bottom: '25%',
    right: '10vw',
    zIndex: 10,
    color: '#f3ef1c',
  },
}));


const StudentsTable = ({ studentsData, caption }) => {

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('Reg. Number');
  const [filterText, setFilterText] = useState('');
  const [filterField, setFilterField] = useState('');
  const [studentList, setStudentList] = useState(studentsData);
  const [filterCompleted, setFilterCompleted] = useState(false)
  const [filterItemsCount, setFilterItensCount] = useState(0)
  const anchorElRef = useRef();
  const timeoutRef = useRef();
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, toggleFilter] = useState(false);

  useEffect(() => {
    setFilterCompleted(false)
    if (filterField && filterText) {
      filterFunc()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterText, filterField])



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (event) => {
    const elName = event.target.tagName.toLowerCase();
    let elem;

    if (elName === 'svg') {
      elem = event.target.parentElement;
    }
    else if (elName === 'path') {
      elem = event.target.parentElement.parentElement;
    }
    else {
      elem = event.target;
    }

    const property = elem.innerText.split('\n')[0]
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  function filterFunc() {
    const filterValue = studentsData.filter(studentData => {
      if (filterField === 'Surname' || filterField === 'First Name' || filterField === 'Other Names') {
        return (filterText.toLowerCase() === studentData.name[sortKeysMap[filterField]].toLowerCase());
      }
      else {
        return (filterText.toLowerCase() === studentData[sortKeysMap[filterField]].toLowerCase());
      }
    })
    if (!isEmptyArrayOrObject(filterValue)) {
      setStudentList(filterValue);
      setAnchorEl(anchorElRef.current);
      setFilterCompleted(true)
      setTimeout(filterPopperTimeout, 5000);
    } else {
      setStudentList(studentsData);
    }
    setFilterItensCount(filterValue.length);
  }

  const filterMessage = () => {
    if (filterItemsCount > 1) {
      return `${filterItemsCount} matched results`
    } else if (filterItemsCount === 1) {
      return `${filterItemsCount} matched result`
    }
    return 'no matched result'
  }

  function filterPopperTimeout() {
    setFilterCompleted(false);
    setFilterItensCount(0);
    clearTimeout(timeoutRef.current);
  }

  const goToPath = (path) => {
    history.push(path)
  }

  const handleFiterToggle = () => {
    toggleFilter(!filter);
    setFilterText('');
    setFilterField('');
    setStudentList(studentsData);
  }

  return (
    <>
      <Typography variant='h5' align='center'>{caption}</Typography>
      <div className={classes.root}>
        <div ref={anchorElRef}>
          <FilterTableToolBar
            filterFields={Object.keys(sortKeysMap)}
            value={filterText}
            onChange={e => setFilterText(e.target.value)}
            onKeyUp={filterFunc}
            filterField={filterField}
            onFilterChange={e => setFilterField(e.target.value)}
            filter={filter}
            toggleFilter={handleFiterToggle}
          />
          <Popper
            open={filterCompleted}
            anchorEl={anchorEl}
          >
            <Paper className={classes.paper}>{filterMessage()}</Paper>
          </Popper>
        </div>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table size='small' padding='none' aria-label="subjects table">
            <StudentsTableHeadData
              inputProps={{ 'aria-label': 'select all students' }}
              order={order}
              orderBy={orderBy}
              orderID={orderBy}
              onClick={handleRequestSort}
            />
            <TableBody>
              {
                stableSort(studentList, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((studentData, index) => {

                  return (<StudentsTableBodyData
                    onDoubleClick={() => goToPath(`/admin/students/student/profile/${studentData._id}`)}
                    key={studentData._id}
                    studentData={studentData}
                    index={index}
                    onClick={() => goToPath(`/admin/students/student/profile/${studentData._id}`)}
                  // inputProps={{ 'aria-labelledby': labelId }}
                  />)
                })
              }
            </TableBody>
          </Table>
          <IconButton onClick={() => goToPath('/admin/add-student')} className={classes.addBtn}> <AddCircleOutlineOutlinedIcon /> </IconButton>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50, 100, { label: 'All', value: studentList.length }]}
          component="div"
          count={studentList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
}

export default StudentsTable;
