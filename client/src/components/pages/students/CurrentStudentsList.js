import React from 'react';
import StudentsTable from './StudentsTable';
import listOfStudents from './ListOfStudents';
import { fetchCurrentStudents } from '../../../redux/actions/admin-action';
import { setPageTitle } from '../../../libs/utility-functions';

const CurrentStudentsList = ({ studentsData }) => {
    setPageTitle('Current Students');
    return (
        <StudentsTable caption='List of Current Students' studentsData={studentsData} />
    )
}

export default listOfStudents(fetchCurrentStudents)(CurrentStudentsList);
