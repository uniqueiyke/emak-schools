const createGradeBookManager = require('../models/academic-year');


const toInt = val => {
    if (!val) return 0;
    return parseInt(val);
}

function findClass(classes, class_name) {
    for (const cl of classes) {
        if (class_name === cl.class_name) return cl;
    }
    return null;
}

const getOneClass = async (session, term, class_name, populate = false, populatePath = 'students', populateFields = 'reg_number name') => {
    try {
        const GradeBookManager = createGradeBookManager(session);
        let termGradeBook = null;
        if(populate){
            termGradeBook = await GradeBookManager.findOne({ term })
            .populate({
                path: 'classes',
                populate: {
                    path: populatePath, select: populateFields,
                }
            });
        }else {
            termGradeBook = await GradeBookManager.findOne({ term });
        }

        if (!termGradeBook) {
            throw (`GradeBook ${session.replace('_', '/')} ${term} not created`)
        }

        const oneClass = findClass(termGradeBook.classes, class_name);

        if (!oneClass) {
            throw (`Nq${class_name.replace('_', '').toUpperCase()} class found. GradeBook not added`)
        }
        return [oneClass, termGradeBook];
    } catch (e) {
        throw e
    }
}

const sortArray = async (array, order) => {
    const tempArr = [];
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        //To be implimented later

    }
}

// getOneClass('2022/2023', 'Second Term', 'jss3_a').then(r => console.log(r))
//     .catch(e => console.log(e));

const getResultSlip = async (session, term, class_name, studentID) => {
    console.log('Finding result')
    
    try {
        
        const [oneClass, termGradeBook] = await getOneClass(session, term, class_name, true, 'students', 'reg_number name gender');
        const resultSlip = {student: {}, subjects: [], result: {}};
        resultSlip.student = oneClass.students.find(student => student._id.toString() === studentID.toString());
        for(const subject of oneClass.subjects){
            const grade = subject.grades.find(grade => grade.student.toString() === studentID.toString());
                resultSlip.subjects.push({
                    title: subject.title,
                    c_a: toInt(grade.scores.total) - toInt(grade.scores.exam),
                    exam: toInt(grade.scores.exam),
                    total: toInt(grade.scores.total),
                    _id: grade.scores._id,
                    position: grade.scores.position
                });
        }
        resultSlip.result = oneClass.results.find(result => result.student.toString() === studentID.toString());
        resultSlip['number_of_students'] = oneClass.students.length;
        if(JSON.stringify(resultSlip) === '{"student":{},"subjects":[],"result":{}}')
            return null;
        return resultSlip;
    } catch (err) {
        console.log(err);
        throw(err.message)
    }
}

module.exports = { getOneClass, findClass, getResultSlip };