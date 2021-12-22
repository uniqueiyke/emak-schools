import React from 'react';
import StudentsTable from './StudentsTable';
import listOfStudents from './ListOfStudents';
import { fetchAllStudents } from '../../../redux/actions/admin-action';
import { setPageTitle } from '../../../libs/utility-functions';

const StudentPresentAndPast = ({ studentsData }) => {
    setPageTitle('All Students');
    return (
        <StudentsTable caption='Students Past And Present' studentsData={studentsData} />
    )
}

export default listOfStudents(fetchAllStudents)(StudentPresentAndPast);
