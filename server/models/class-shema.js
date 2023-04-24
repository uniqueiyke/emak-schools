const { Schema } = require('mongoose');
const StudentResuletSchema = require('./student-result-schema');
const SubjectSchema = require('./subject-schema');

const ClassSchema = new Schema({
    class_name: { type: String, default: '' },
    students: [{ type: Schema.Types.ObjectId, ref: 'Student'}],
    subjects: [{ type: SubjectSchema, default: () => ({})}],
    results: [{ type: StudentResuletSchema, default: () => ({}) }],
    
})

module.exports = ClassSchema;