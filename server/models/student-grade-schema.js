const { Schema } = require('mongoose');
const GradeSchema = require('./grade-schema');

const StudentGradeSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'Student'},
    scores: {type: GradeSchema, default: () => ({})}
}) 

module.exports = StudentGradeSchema;