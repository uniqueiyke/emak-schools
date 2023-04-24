const { Schema } = require('mongoose');
const StudentGradeSchema = require('./student-grade-schema');

const SubjectSchema = new Schema({
    title: { type: String },
    code: { type: String },
    grades: [{type: StudentGradeSchema, default: () => ({})}],
})

module.exports = SubjectSchema;