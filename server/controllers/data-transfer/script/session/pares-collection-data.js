const { readFile } = require('fs/promises');
const { basename } = require('path');
const parseStudentIDs = require('../parse-student-ids');

// const filePath = 'results/result-json/srt';
const terms = {
    '1st': 'First Term',
    '2nd': 'Second Term',
    '3rd': 'Third Term'
};

const sessionCollectionData = async filePath => {
    try {
        const file = await readFile(filePath, { encoding: 'utf-8' });
        const classObjects = JSON.parse(file);
        const classObjArr = [];
        const collName = basename(filePath).split('_')

        for(const c of classObjects){
            classObjArr.push({
                class_name: c.class_name,
                students: parseStudentIDs(c.students_list),
                term: terms[collName[3].split('.')[0]],
                year: `${collName[1]}/${collName[2]}`
            })
        }
        return classObjArr;
    } catch (e) {
        throw err.message;
    }
}

module.exports = sessionCollectionData;

// sessionCollectionData(join(filePath, 'SRT_2021_2022_1st.json')).then(d => console.log(d)).catch(e => console.log(e));