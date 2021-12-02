const { Schema, model, models } = require('mongoose');
ResultSubjectSchema = require('./result-subject-schema');

const sessionTerm = (session, term, level) => {
    const s = session.replace('/', '_');
    return `RT_${level}_${s}_${term}`;
}

const computeResults = (session, term, level) => {
    const ResultSchema = new Schema({
        student: { type: Schema.Types.ObjectId, ref: 'Student', unique: true },
        subjects: [{ type: ResultSubjectSchema, default: () => ({}) }],
        total: { type: Number, default: 0 },
        average: { type: Number, default: 0 },
        position: String,
        number_of_students: 0,
    })

    return models[sessionTerm(session, term, level)] || model(sessionTerm(session, term, level), ResultSchema, sessionTerm(session, term, level));
}

module.exports = computeResults;