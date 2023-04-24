const { Schema } = require('mongoose');

const StudentResuletSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'Student'},
    total: { type: Number, default: 0 },
    average: { type: Number, default: 0 },
    position: { type: String, default: "" },
})

module.exports = StudentResuletSchema;