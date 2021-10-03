const {Schema, model} = require('mongoose');
const GradeBookScoreSchema = require('./grade-book-score-schema');

const createGradeBook = (gradeBookName) => {
    const GradeBookSchema = new Schema({
        stu_id: {type: Schema.Types.ObjectId, ref: 'Student'},
        score: {type: GradeBookScoreSchema, default: () => ({})},
    })
    
    return model(gradeBookName, GradeBookSchema, `${gradeBookName}s`);
}

module.exports = createGradeBook;