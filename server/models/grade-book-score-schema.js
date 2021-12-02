const { Schema } = require('mongoose');

const GradeBookScoreSchema = new Schema({
    first_quiz: { type: Number, default: 0 },
    second_quiz: { type: Number, default: 0 },
    third_quiz: { type: Number, default: 0 },
    c_a: { type: Number, default: 0 },
    exam: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    position: { type: String, default: "" },
})

module.exports = GradeBookScoreSchema;