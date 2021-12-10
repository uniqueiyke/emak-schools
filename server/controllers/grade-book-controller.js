const createGradeBookManager = require('../models/session-term-schema');
const { subjects, terms } = require('../libs/subjects');
const gradeBookScore = require('../models/grade-book-score');
const computeResults = require('../models/result');
const mongoose = require('mongoose');

const toInt = val => {
    if (!val) return 0;
    return parseInt(val);
}

const paserStudentsData = (students_list, scores) => {
    const students = [];
    for (const stu of students_list) {
        const stu_scores = scores.find(val => val.stu_id._id.toString() === stu._id.toString())
        if (!stu_scores) {
            students.push({
                reg_number: stu.reg_number,
                _id: stu._id,
                name: stu.name,
                scores: {
                    first_quiz: '',
                    second_quiz: '',
                    third_quiz: '',
                    c_a: '',
                    exam: '',
                    position: '',
                    total: ''
                },
            })
        } else {
            students.push({
                reg_number: stu.reg_number,
                _id: stu._id,
                name: stu.name,
                scores: stu_scores.scores,
            })
        }
    }
    return students;
}

const setPosition = val => {
    const ett = [11, 12, 13];

    if (ett.includes(val)) {
        return `${val}th`;
    } else {
        valStr = val.toString();
        if (valStr[valStr.length - 1] === '1') {
            return `${val}st`;
        }
        else if (valStr[valStr.length - 1] === '2') {
            return `${val}nd`;
        }
        else if (valStr[valStr.length - 1] === '3') {
            return `${val}rd`;
        }
        else {
            return `${val}th`;
        }
    }
}

const parsePositions = async list => {
    for (let i = 0; i < list.length; i++) {
        const record = list[i];
        if (i === 0) {
            record.scores.position = setPosition(i + 1);
            await record.save();
        } else {
            const prevRecord = list[i - 1]
            if (prevRecord.scores.total === record.scores.total) {
                record.scores.position = prevRecord.scores.position;
                await record.save();
            } else {
                record.scores.position = setPosition(i + 1);
                await record.save();
            }
        }
    }

    return list;
}

exports.grade_book = async (req, res) => {
    const { session, term, class_name, subject } = req.query;

    try {
        const GradeBookManager = createGradeBookManager(session, `${terms[term].short_title}`);
        let gradeBookManager = await GradeBookManager.findOne({ class_name })
            .populate('students_list', 'reg_number name');
        if (!gradeBookManager) {
            return res.status(400).json({ message: `No ${class_name.replace('_', ' ').toUpperCase()} GradeBook created` })
        }

        if (!gradeBookManager.subjects_list.includes(subject)) {
            gradeBookManager.subjects_list.push(subject);
            await gradeBookManager.save();
        }

        const GradeBookScore = gradeBookScore(`${subject}_${class_name}_${terms[term].short_title}_${session}`);
        const allGradeBookScores = await GradeBookScore.find()
            .sort('-scores.total');
        const allScores = await parsePositions(allGradeBookScores);

        return res.json(paserStudentsData(gradeBookManager.students_list, allScores));
    }
    catch (err) {
        console.log(err.message)
        res.status(401).json(err.message);
    }
}

exports.update_grade_book_score = async (req, res) => {
    const { session, term, class_name, subject } = req.query;
    const { scores, stu_id } = req.body;
    try {
        const GradeBookScore = gradeBookScore(`${subject}_${class_name}_${terms[term].short_title}_${session}`);
        let gradeBookScores = await GradeBookScore.findOne({ stu_id });
        if (!gradeBookScores) {
            gradeBookScores = new GradeBookScore({
                scores,
                stu_id,
            })
            gradeBookScores.scores.total = toInt(scores.first_quiz) + toInt(scores.second_quiz) + toInt(scores.third_quiz) + toInt(scores.c_a) + toInt(scores.exam);
            await gradeBookScores.save();
        } else {
            gradeBookScores.scores = scores;
            gradeBookScores.scores.total = toInt(scores.first_quiz) + toInt(scores.second_quiz) + toInt(scores.third_quiz) + toInt(scores.c_a) + toInt(scores.exam);
            await gradeBookScores.save();
        }
        const allScores = await GradeBookScore.find();
        res.json(allScores);
    } catch (err) {
        console.log(err.message)
        res.status(401).json(err.message);
    }
}

exports.get_grade_book_score = async (req, res) => {
    const { session, term, class_name, subject, stu_id } = req.query;
    try {
        const GradeBookScore = gradeBookScore(`${subject}_${class_name}_${terms[term].short_title}_${session}`);
        const scores = await GradeBookScore.findOne({ stu_id })
        if (scores) { return res.json(scores.scores); }
        res.json({
            first_quiz: '',
            second_quiz: '',
            third_quiz: '',
            c_a: '',
            exam: '',
        });
    } catch (err) {
        console.log(err.message)
        res.status(401).json(err.message);
    }
}

exports.compute_results = async (req, res) => {

    try {
        const { session, term, class_name } = req.query;
        const GradeBookManager = createGradeBookManager(session, `${terms[term].short_title}`);
        let gradeBookManager = await GradeBookManager.findOne({ class_name });
        const { students_list, subjects_list } = gradeBookManager;
        const ComputeResult = computeResults(session, `${terms[term].short_title}`, class_name);
        
        //Check if collection already exist
        const collectionName = `RT_${class_name}_${session}_${terms[term].short_title}`;
        const collections = await mongoose.connection.db.listCollections().toArray();
        for(const collection of collections){
            if(collection.name === collectionName){
                await ComputeResult.collection.drop();
                break;
            }
        }
        
        //Create new collection and add the data for each student
        for (let i = 0; i < students_list.length; i++) {
            const student = students_list[i];
            const result = new ComputeResult({
                student,
            });
            let numOfSubjects = 0;
            for (let j = 0; j < subjects_list.length; j++) {
                const subject = subjects_list[j];
                const GradeBookScore = gradeBookScore(`${subject}_${class_name}_${terms[term].short_title}_${session}`);
                const scores = await GradeBookScore.findOne({ stu_id: student });
                if (scores) {
                    numOfSubjects++;
                    result.subjects.push({
                        title: subjects[subject].label,
                        c_a: scores.scores.first_quiz + scores.scores.second_quiz + scores.scores.third_quiz + scores.scores.c_a ,
                        exam: scores.scores.exam,
                        total: scores.scores.total,
                        position: scores.scores.position,
                    })
                    
                    if(scores.scores.total){
                        if(!result.total){
                            result.total = scores.scores.total;
                        }else {
                            result.total += scores.scores.total;
                        }
                    }else if(scores.scores.total === 0) {
                        result.total = scores.scores.total;
                    }
                }else {
                    result.subjects.push({
                        title: subjects[subject].label,
                        c_a: null,
                        exam: null,
                        total: null,
                        position: '',
                    })
                }
            }
            
            if(result.total && numOfSubjects > 0){
                const avg = result.total / numOfSubjects;
                result.average = parseFloat(avg.toFixed(2))
            }
            
            await result.save();
        }

        //Compute the overall position of each student
        const gradeScores = await ComputeResult.find().populate('student', 'reg_number name').sort('-average');

        for (let i = 0; i < gradeScores.length; i++) {
            const record = gradeScores[i];

            if (i === 0) {
                record.position = setPosition(i + 1);
                record.number_of_students = gradeScores.length
                await record.save();
            } else {
                const prevRecord = gradeScores[i - 1]
                if (prevRecord.average === record.average) {
                    record.position = prevRecord.position;
                    record.number_of_students = gradeScores.length
                    await record.save();
                } else {
                    record.position = setPosition(i + 1);
                    record.number_of_students = gradeScores.length
                    await record.save();
                }
            }
        }
        res.json(gradeScores)
    } catch (err) {
        console.log(err.message);
        res.status(401).json(err.message)
    }
}

exports.fetch_results_sheet = async (req, res) => {

    try {
        const { session, term, class_name } = req.query;
        const ComputeResult = computeResults(session, `${terms[term].short_title}`, class_name);
        const gradeScores = await ComputeResult.find()
            .populate('student', 'reg_number name').sort('-average');
        res.json(gradeScores)
    } catch (err) {
        console.log(err);
        res.status(401).json(err.message)
    }
}

exports.get_results_slip = async (req, res) => {

    try {
        const { session, term, class_name, stu_id } = req.query;
        const ComputeResult = computeResults(session, `${terms[term].short_title}`, class_name);
        const gradeScore = await ComputeResult.findOne({student: stu_id})
            .populate('student', 'reg_number name gender');
        res.json(gradeScore)
    } catch (err) {
        console.log(err);
        res.status(401).json(err.message)
    }
}

exports.fetch_students_class_term = async (req, res) => {
    const { session, term, class_name } = req.query;

    try {
        const GradeBookManager = createGradeBookManager(session, `${terms[term].short_title}`);
        let gradeBookManager = await GradeBookManager.findOne({ class_name })
            .populate('students_list', 'reg_number name gender date_of_birth');
        if (!gradeBookManager) {
            return res.status(400).json({ message: `No ${class_name.replace('_', ' ').toUpperCase()} GradeBook created` })
        }

        return res.json(gradeBookManager.students_list);
    }
    catch (err) {
        console.log(err.message)
        res.status(401).json(err.message);
    }
}

exports.delete_student_from_class = async (req, res) => {
    const { session, term, class_name } = req.query;

    try {
        const GradeBookManager = createGradeBookManager(session, `${terms[term].short_title}`);
        let gradeBookManager = await GradeBookManager.findOne({ class_name });
        if (!gradeBookManager) {
            return res.status(400).json({ message: `No ${class_name.replace('_', ' ').toUpperCase()} GradeBook created` })
        }

        const newList = gradeBookManager.students_list.filter(id => id.toString() !== req.body.id.toString());
        gradeBookManager.students_list = newList;
        await gradeBookManager.save()

        gradeBookManager = await GradeBookManager.findOne({ class_name })
            .populate('students_list', 'reg_number name gender date_of_birth');
        return res.json(gradeBookManager.students_list);
    }
    catch (err) {
        console.log(err.message)
        res.status(401).json(err.message);
    }
}