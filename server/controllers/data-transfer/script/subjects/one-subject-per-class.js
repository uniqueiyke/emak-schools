const { readFile } = require('fs/promises');
const { basename } = require('path');
const parseStudentIDs = require('../parse-student-ids');

const {subjects} = require('C:/Users/Unique_Iyke/Documents/Projects/emak-schools-clone/server/libs/subjects.js');

const oneSubjectPerClass = async filePath => {
    try {
        const file = await readFile(filePath, { encoding: 'utf-8' });
        const scoresObjects = JSON.parse(file);
        const subjectObj = {title: '', code: '', grades: []};
        const splitPath = basename(filePath).split('_');
        
        if(splitPath.length === 6){
            subjectObj.title = splitPath[0];
            subjectObj.code = subjects[splitPath[0]].subject_code;
        }else{
            subjectObj.title = `${splitPath[0]}_${splitPath[1]}`;
            subjectObj.code = subjects[`${splitPath[0]}_${splitPath[1]}`].subject_code;
        }
        for(const s of scoresObjects){
            const {
                first_quiz, second_quiz, third_quiz, 
                c_a, exam, total, position
            } = s.scores
            
            subjectObj.grades.push({
                student: parseStudentIDs(s.stu_id, true), 
                scores: {
                    first_quiz, second_quiz, third_quiz, 
                    c_a, exam, total, position
                }
            });
        }
        return subjectObj;
    } catch (e) {
        throw err.message;
    }
}

module.exports = oneSubjectPerClass;

// oneSubjectPerClass(join(filePath, 'agric_sci_jss1_a_1st_2021_2022.json')).then(d => console.log(d.grades)).catch(e => console.log(e));
// oneSubjectPerClass(join(filePath, 'animal_hus_ss3_a_1st_2021_2022.json')).then(d => {
//     console.log(d.grades)
// }).catch(e => console.log(e));