const { Schema, model, models } = require('mongoose');
// const TermSchema = require('./term-schema');
const classSchema = require('./class-shema');

const academicYear = (acYear) => {
    const s = acYear.replace('/', '_');
    return `acy_${s}`;
}

const createGradeBookManager = (acYear) => {
    const AcademicYearSchema = new Schema({
        term: {type: String, enum: ["First Term", "Second Term", "Third Term"]},
        classes: [{type: classSchema, default: () => ({})}],
    })

    return models[academicYear(acYear)] || model(academicYear(acYear), AcademicYearSchema, academicYear(acYear));
}

module.exports = createGradeBookManager;