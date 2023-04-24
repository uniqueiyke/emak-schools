const { readFile } = require('fs/promises');
const parseStudentIDs = require('../parse-student-ids');

// const filePath = 'results/result-json';

const resultsPerClassPerTerm = async filePath => {
    try {
        const file = await readFile(filePath, { encoding: 'utf-8' });
        const resultObjects = JSON.parse(file);
        const arrOfResults = [];
        for (const r of resultObjects) {
            arrOfResults.push({
                student: parseStudentIDs(r.student, true),
                total: r.total, 
                average: r.average,
                position: r.position, 
            })
        }
        return arrOfResults;
    } catch (e) {
        throw e;
    }
}

module.exports = resultsPerClassPerTerm;

// resultsPerClassPerTerm(join(filePath, 'RT_ss1_a_2021_2022_1st.json'))
// .then(r => console.log(r))
// .catch(e => console.log(e))