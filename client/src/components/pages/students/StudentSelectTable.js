import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { useDispatch, useSelector } from 'react-redux';
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SortTableHead from './SortTableHead';
import SortTableBody from './SortTableBody';
import listOfStudents from './ListOfStudents';
import FilterTableToolBar from './FilterTableToolBar';
import { isEmptyArrayOrObject, alertMessageParser } from '../../../libs/utility-functions';
import Popper from '@material-ui/core/Popper';
import { fetchCurrentStudents } from '../../../redux/actions/admin-action';
import { sortKeysMap, getComparator, stableSort } from '../../../libs/sort-n-filter';
import ResultManager from '../../grade-book/ResultManager';
import FormFieldsValidator from '../../../libs/form-fields-validator';
import { createResultManager } from '../../../redux/actions/admin-action'
import MessageAlert from '../../other-components/MessageAlert';
import { currentAcademicYear, currentTerm } from '../../../libs/session-array';


const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 650,
    },
    paper: {
        border: '1px solid',
        padding: theme.spacing(1),
        backgroundColor: 'green',
        color: '#ffffff',
    },
    divStyle: {
        margin: '10px 0px',
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

const StudentSelectTable = ({ studentsData }) => {
    const classes = useStyles();

    const [selected, setSelected] = useState([]);
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
    // eslint-disable-next-line no-unused-vars
    const [anchorEl, setAnchorEl] = useState(null);
    const [filter, toggleFilter] = useState(false);
    const [clientSubmitError, setClientSubmitError] = useState(null)

    const initialSubmitValueState = {
        session: currentAcademicYear(),
        term: currentTerm(),
        class_name: 'jss1',
        class_stream: 'A',
    }
    const [submitValueState, setSubmitValueState] = useState(initialSubmitValueState);
    const dispatch = useDispatch();
    const {resultManager} = useSelector(state => state.admin)

    useEffect(() => {
        setFilterCompleted(false)
        if (filterField && filterText) {
            filterFunc()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterText, filterField]);

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = studentList.map((stud) => stud._id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };


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

    const isSelected = (id) => selected.indexOf(id) !== -1;

    function filterFunc() {
        const filterValue = studentsData.filter(studentData => {
            if (filterField === 'Surname' || filterField === 'First Name') {
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
            setSelected([]);
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
    const handleValueChange = e => {
        setSubmitValueState({ ...submitValueState, [e.target.name]: e.target.value });
    }

    const handleSubmit = e => {
        e.preventDefault();
        
        setClientSubmitError(null);
        const formValidator = new FormFieldsValidator({ ...submitValueState, students_list: selected })
        formValidator.field('session').isEmpty().withMessage('please choose the academic session');
        formValidator.field('class_name').isEmpty().withMessage('please choose students class');
        formValidator.field('term').isEmpty().withMessage('please choose the term');
        formValidator.field('students_list').arrayValues().withMessage('Select at least a student.');
        const err = formValidator.errorMessage();

        if (!isEmptyArrayOrObject(err)) {
            setClientSubmitError(err)
            return;
        }
        
        const val = {
            session: submitValueState.session.replace('/', '_'),
            term: submitValueState.term.replace(' ', '_'),
            class_name: `${submitValueState.class_name}_${submitValueState.class_stream.toLowerCase()}`,
            students_list: selected,
        }

        // console.log(val);
        dispatch(createResultManager(val));
        setSubmitValueState(initialSubmitValueState);
        setSelected([]);
        setFilterField('');
        setFilterText('');
        setStudentList(studentsData);
    }

    const handleFiterToggle = () => {
        toggleFilter(!filter);
        setFilterText('');
        setFilterField('');
        setStudentList(studentsData);
    }

    return (
        <>
        {clientSubmitError &&  <MessageAlert error>{alertMessageParser(clientSubmitError)}</MessageAlert>}
        {resultManager.error &&  <MessageAlert error>{alertMessageParser(resultManager.error)}</MessageAlert>}
        {(resultManager.data && resultManager.data.message) &&  <MessageAlert data>{alertMessageParser(resultManager.data.message)}</MessageAlert>}
            <Typography variant='h5' align='center'>Add Students to Term Result Manager</Typography>
            <div className={classes.divStyle}>
                <ResultManager
                    onValueChange={handleValueChange}
                    onSubmit={handleSubmit}
                    vSession={submitValueState.session}
                    vTerm={submitValueState.term}
                    vClass={submitValueState.class_name}
                    vStream={submitValueState.class_stream}
                />
            </div>
            <div ref={anchorElRef}>
                    <FilterTableToolBar
                        numSelected={selected.length}
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
            <TableContainer component={Paper}>
                <Table size='small' padding='none' className={classes.table} aria-label="subjects table">
                    <SortTableHead
                        indeterminate={selected.length > 0 && selected.length < studentList.length}
                        checked={studentList.length > 0 && selected.length === studentList.length}
                        onChange={handleSelectAllClick}
                        inputProps={{ 'aria-label': 'select all students' }}
                        order={order}
                        orderBy={orderBy}
                        orderID={orderBy}
                        onClick={handleRequestSort}
                    />
                    <TableBody>
                        {
                            stableSort(studentList, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((studentData, index) => {
                                const isItemSelected = isSelected(studentData._id);
                                const labelId = `${studentData.last_name} ${studentData.first_name} selected`;
                                return (<SortTableBody
                                    onClick={(event) => handleClick(event, studentData._id)}
                                    ariaChecked={isItemSelected}
                                    tabIndex={-1}
                                    selected={isItemSelected}
                                    key={studentData._id}
                                    studentData={studentData}
                                    index={index}
                                    checked={isItemSelected}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />)
                            })
                        }
                    </TableBody>
                </Table>
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
        </>
    );
}

export default listOfStudents(fetchCurrentStudents)(StudentSelectTable);
