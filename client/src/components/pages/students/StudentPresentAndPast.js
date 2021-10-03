import React from 'react';
import StudentsTable from './StudentsTable';
import listOfStudents from './ListOfStudents';
import { fetchAllStudents } from '../../../redux/actions/admin-action';

const StudentPresentAndPast = ({ studentsData }) => {
    return (
        <StudentsTable caption='Students Past And Present' studentsData={studentsData} />
    )
}

export default listOfStudents(fetchAllStudents)(StudentPresentAndPast);
