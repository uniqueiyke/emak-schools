import React from 'react';
import StudentProfileData from './StudentProfileData'

const StudentProfile = ({ student }) => {
    return (
        <StudentProfileData profileData={student} />
    )
}

export default StudentProfile
