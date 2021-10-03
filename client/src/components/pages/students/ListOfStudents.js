import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataFetchingProgress from '../../other-components/DataFetchingProgress';
import Errors from '../../other-components/Errors';

const listOfStudents = fetchFunc => (WrappedComponenet) => {
    return function ListOfStudents() {
        const students = useSelector(state => state.admin.students);
        const dispatch = useDispatch();

        useEffect(() => {
            // if (!students.data)
                dispatch(fetchFunc());
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
        if (students.isFetchingStudents || (!students.data && !students.error)) {
            return (
                <DataFetchingProgress />
            )
        } else {
            return (
                <>
                    {
                        students.error ? <Errors errors={students.error} />
                            :
                            <>
                                <WrappedComponenet studentsData={students.data} />
                            </>
                    }

                </>
            )
        }

    }
}

export default listOfStudents
