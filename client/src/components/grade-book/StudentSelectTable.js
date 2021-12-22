import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { useDispatch, useSelector } from 'react-redux';
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SortTableHead from '../pages/students/SortTableHead';
import SortTableBody from '../pages/students/SortTableBody';
import listOfStudents from '../pages/students/ListOfStudents';
import FilterTableToolBar from '../pages/students/FilterTableToolBar';
import { isEmptyArrayOrObject, alertMessageParser, setPageTitle } from '../../libs/utility-functions';
import Popper from '@material-ui/core/Popper';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { fetchCurrentStudents } from '../../redux/actions/admin-action';
import { sortKeysMap, getComparator, stableSort } from '../../libs/sort-n-filter';
import ResultManager from './ResultManager';
import FormFieldsValidator from '../../libs/form-fields-validator';
import { createResultManager } from '../../redux/actions/admin-action'
import AlertMessage from '../other-components/AlertMessage';
import { currentAcademicYear, currentTerm } from '../../libs/session-array';
import WrongInclusionDailog from './WrongInclusionDailog';


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
    btnDiv: {
        margin: '10px 10px',
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
        gridTemplateColumns: 'auto auto',
        gap: 0,
        color: 'forestgreen',
    },
}));

const StudentSelectTable = ({ studentsData }) => {
    setPageTitle('Result Manager');
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

    const initErrorState = { isError: false, errorMsg: null }
    const [pageError, setPageError] = useState(initErrorState)
    const [isSuccessful, setIsSuccessful] = useState(false)

    const initialSubmitValueState = {
        session: currentAcademicYear(),
        term: currentTerm(),
        class_name: 'jss1',
        class_stream: 'A',
    }

    const [submitValueState, setSubmitValueState] = useState(initialSubmitValueState);
    const dispatch = useDispatch();
    const { data, error } = useSelector(state => state.admin.resultManager)
    const [dialogOpen, setDailogOpen] = useState(false);
    const [notClassMembers, setNotClassMembers] = useState([]);

    useEffect(() => {
        setFilterCompleted(false)
        if (filterField && filterText) {
            filterFunc()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterText, filterField]);

    useEffect(() => {
        if (error) {
            setPageError({ isError: error.is_error, errorMsg: error.error_msg })
        }
        if (data) {
            setIsSuccessful(data.is_successful)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, error])

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

        setPageError(null);
        const formValidator = new FormFieldsValidator({ ...submitValueState, students_list: selected })
        formValidator.field('session').isEmpty().withMessage('please choose the academic session');
        formValidator.field('class_name').isEmpty().withMessage('please choose students class');
        formValidator.field('term').isEmpty().withMessage('please choose the term');
        formValidator.field('students_list').arrayValues().withMessage('Select at least a student.');
        const err = formValidator.errorMessage();

        if (!isEmptyArrayOrObject(err)) {
            setPageError({ isError: true, errorMsg: err })
            return;
        }

        let classMembers = [...selected];
        const wrongMembers = []
        for (const s of studentsData) {
            if (selected.includes(s._id) && s.current_class.toLowerCase() !== submitValueState.class_name.toLowerCase()) {
                wrongMembers.push(s.reg_number)
                classMembers  = classMembers.filter(id => id.toString() !== s._id.toString());
            }

            setSelected(classMembers);
        }
        
        const val = {
            session: submitValueState.session.replace('/', '_'),
            term: submitValueState.term,
            class_name: `${submitValueState.class_name}_${submitValueState.class_stream.toLowerCase()}`,
            students_list: selected,
        }

        if (wrongMembers.length > 0) {
            setNotClassMembers(wrongMembers);
            setDailogOpen(true);
        } else {
            dispatch(createResultManager(val));
            setSubmitValueState(initialSubmitValueState);
            setSelected([]);
            setFilterField('');
            setFilterText('');
            setStudentList(studentsData);
            setNotClassMembers([]);
        }

    }

    const handleDailogSubmit = () => {
        const val = {
            session: submitValueState.session.replace('/', '_'),
            term: submitValueState.term,
            class_name: `${submitValueState.class_name}_${submitValueState.class_stream.toLowerCase()}`,
            students_list: selected,
        }

        dispatch(createResultManager(val));
        setSubmitValueState(initialSubmitValueState);
        setSelected([]);
        setFilterField('');
        setFilterText('');
        setStudentList(studentsData);
        setDailogOpen(false);
        setNotClassMembers([]);
    }

    const handleFiterToggle = () => {
        toggleFilter(!filter);
        setFilterText('');
        setFilterField('');
        setStudentList(studentsData);
    }

    return (
        <>
            {pageError && <AlertMessage severity='error' open={pageError.isError} onClose={() => setPageError(initErrorState)}>{alertMessageParser(pageError.errorMsg)}</AlertMessage>}
            {(data && data.is_successful) && <AlertMessage severity='success' open={isSuccessful} onClose={() => setIsSuccessful(false)}>{alertMessageParser(data.message)}</AlertMessage>}
            <WrongInclusionDailog open={dialogOpen} onClose={() => setDailogOpen(false)} onSend={handleDailogSubmit} wrongInclusion={notClassMembers} classname={submitValueState.class_name} />
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
            <div className={classes.btnDiv}>
                <Button size='small' onClick={handleSubmit} variant='outlined' type='submit' style={{ color: 'forestgreen', borderColor: 'forestgreen' }} startIcon={<AddBoxIcon style={{ color: 'forestgreen' }} />} >
                    add
                </Button>
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
