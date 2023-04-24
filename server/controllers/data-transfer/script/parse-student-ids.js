const parseStudentIDs = (students, oneStudent = false) => {

    if(oneStudent){
        return students['$oid']
    }

    const tempStudents = []
    for (const student of students) {
        tempStudents.push(student['$oid']);
    }

    return tempStudents;
}

module.exports = parseStudentIDs