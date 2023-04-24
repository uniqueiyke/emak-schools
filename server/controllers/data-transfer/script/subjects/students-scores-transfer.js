const { getOneClass } = require("../../../../libs/utility-function");
const subjectsPerClass = require("./subjects-per-class-per-team");

const terms = {
    '1st': 'First Term',
    '2nd': 'Second Term',
    '3rd': 'Third Term'
};

const transferClassScores = async (cts) => {
    try {
        const s = cts.split('_');
        const [oneClass, termGradeBook] = await getOneClass(`${s[3]}/${s[4]}`, terms[s[2]], `${s[0]}_${s[1]}`);
        const subjects = await subjectsPerClass(cts);
        oneClass.subjects = subjects;
        await termGradeBook.save();
    } catch (error) {
        console.log(error);
    }
}



module.exports = transferClassScores;

// transferClassScores(DIR_PATH, 'jss2_a_1st_2021_2022')
// .catch(e => console.log(e));