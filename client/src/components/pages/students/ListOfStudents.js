import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'
import StudentsTable from './StudentsTable';
import DataFetchingProgress from '../../other-components/DataFetchingProgress';
import { fetchAllStudents } from '../../../redux/actions/admin-action';

const ListOfStudents = () => {
    const students = useSelector(state => state.admin.students);
    const dispatch = useDispatch();

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
            </>
        )
    }

}

export default ListOfStudents
