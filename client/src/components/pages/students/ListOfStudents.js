import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'
import StudentsTable from './StudentsTable';
import DataFetchingProgress from '../../other-components/DataFetchingProgress';
import { fetchAllStudents } from '../../../redux/actions/admin-action';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useHistory } from 'react-router-dom';


const useStyle = makeStyles({
    addBtn: {
        position: 'fixed',
        bottom: '25vh',
        right: '10vw',
        zIndex: 10,
        color: '#f3ef1c',
    }
})

const ListOfStudents = () => {
    const classes = useStyle();
    const students = useSelector(state => state.admin.students);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (!students.data) {
            dispatch(fetchAllStudents());
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (students.isFetchingStudents || (!students.data && !students.error)) {
        return (
            <DataFetchingProgress />
        )
    } else {
        return (
            <>
                <Typography variant='h5' align='center'>Student Table</Typography>
                <StudentsTable studentsData={students.data}/>
                <IconButton onClick={() => history.push('/admin/add-student')} className={classes.addBtn}> <AddCircleOutlineOutlinedIcon /> </IconButton>
            </>
        )
    }

}

export default ListOfStudents
