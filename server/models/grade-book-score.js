const { Schema, model, models } = require('mongoose');
const GradeBookScoreSchema = require('./grade-book-score-schema');

const gradeBookScore = (gradeBookName) => {
    const GradeBookSchema = new Schema({
        stu_id: { type: Schema.Types.ObjectId, ref: 'Student', unique: true },
        scores: { type: GradeBookScoreSchema, default: () => ({}) },
    })

    return models[gradeBookName] || model(gradeBookName, GradeBookSchema, gradeBookName);
}

module.exports = gradeBookScore;