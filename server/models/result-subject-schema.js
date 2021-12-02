const { Schema } = require('mongoose');

const ResultSubjectSchema = new Schema({
    title: {type: String},
    c_a: Number,
    exam: Number,
    total: Number,
    position: String,
})

module.exports = ResultSubjectSchema;