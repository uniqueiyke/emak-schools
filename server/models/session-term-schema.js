const { Schema, model, models } = require('mongoose');

const sessionTerm = (session, term) => {
    const s = session.replace('/', '_');
    return `SRT_${s}_${term}`;
}

const createGradeBookManager = (session, term) => {
    const SessionTermSchema = new Schema({
        class_name: {type: String, unique: true},
        students_list: [{ type: Schema.Types.ObjectId, ref: 'Student', unique: true }],
        subjects_list: [{ type: String}],
    })

    return models[sessionTerm(session, term)] || model(sessionTerm(session, term), SessionTermSchema, sessionTerm(session, term));
}

module.exports = createGradeBookManager;