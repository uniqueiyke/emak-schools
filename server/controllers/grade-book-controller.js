const mongoose = require('mongoose');
const { subjects, terms } = require('../libs/subjects');
const Student = require('../models/student');
const CardDetails = require('../models/card-details');
const { getOneClass, getResultSlip } = require('../libs/utility-function');

const toInt = val => {
    if (!val) return 0;
    return parseInt(val);
}

const parseStudentsData = (students_list, scores) => {
    const students = [];
    for (const stu of students_list) {
        const stu_scores = scores.find(s => {
            // console.log(s)
            return s.student.toString() === stu._id.toString()
        })
        // console.log(stu._id);
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
        } else {
            const prevRecord = list[i - 1]
            if (prevRecord.scores.total === record.scores.total) {
                record.scores.position = prevRecord.scores.position;
            } else {
                record.scores.position = setPosition(i + 1);
            }
        }
    }

    return list;
}

const isSubjectAdded = (grades, subject) => {
    if (grades.length > 0) {
        for (const grade of grades) {
            if (grade.short_title === subject) {
                return true;
            }
        }
    }
    return false;
}

exports.grade_book = async (req, res) => {
    const { session, term, class_name, subject } = req.query;

    try {
        const [oneClass, termGradeBook] = await getOneClass(session, term, class_name, true);
        let cSub = oneClass.subjects.find(s => s.title === subject);
        let stu_scores = [];
        if (!cSub) {
            cSub = {};
            cSub.title = subject;
            cSub.code = subjects[subject].subject_code;
            oneClass.subjects.push(cSub);
            await termGradeBook.save();
        }
        else {
            cSub.grades = cSub.grades.sort((a, b) => toInt(b.scores.total) - toInt(a.scores.total))
            stu_scores = await parsePositions(cSub.grades)
            await termGradeBook.save();
        }

        const studentsData = parseStudentsData(oneClass.students, stu_scores)
        return res.json(studentsData);
    }
    catch (err) {
        console.log(err)
        res.status(401).json(err);
    }
}

exports.update_grade_book_score = async (req, res) => {
    const { session, term, class_name, subject } = req.query;
    const { scores, stu_id } = req.body;
    try {
        const [oneClass, termGradeBook] = await getOneClass(session, term, class_name);
        let cSub = oneClass.subjects.find(s => s.title === subject);

        if (!cSub) {
            throw Error(`GradeBook for ${session} acdemic session ${term} is not created`)
        }

        const tScore = {};
        tScore.first_quiz = scores.first_quiz;
        tScore.second_quiz = scores.second_quiz;
        tScore.third_quiz = scores.third_quiz;
        tScore.c_a = scores.c_a;
        tScore.exam = scores.exam;
        tScore.total = toInt(scores.first_quiz) + toInt(scores.second_quiz) + toInt(scores.third_quiz) + toInt(scores.c_a) + toInt(scores.exam);

        let stu_scores = cSub.grades.find(grade => grade.student.toString() === stu_id.toString())

        if (!stu_scores) {
            cSub.grades.push({
                student: stu_id,
                scores: tScore
            })
        } else {
            cSub.grades = cSub.grades.filter(grade => grade.student.toString() !== stu_id.toString())
            cSub.grades.push({
                student: stu_id,
                scores: tScore
            })
        }

        await termGradeBook.save();
        res.json(cSub.grades);
    } catch (err) {
        console.log(err)
        res.status(401).json(err.message);
    }
}

exports.get_grade_book_score = async (req, res) => {
    const { session, term, class_name, subject, stu_id } = req.query;
    try {
        const [oneClass, termGradeBook] = await getOneClass(session, term, class_name);

        let cSub = oneClass.subjects.find(s => s.title === subject);
        let scores = cSub.grades.find(grade => grade.student.toString() === stu_id.toString())
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
    const { session, term, class_name } = req.query;
    try {
        const [oneClass, termGradeBook] = await getOneClass(session, term, class_name, true);
        const resultSheet = {};
        oneClass.results = [] //Reset the result array
        for (const student of oneClass.students) {
            const oneStudentResult = [];
            let grandTotal = 0;
            for (const subject of oneClass.subjects) {
                const sub = subject.grades.find(grade => grade.student.toString() === student._id.toString());
                if (sub) {
                    oneStudentResult.push({
                        title: subject.title,
                        total: toInt(sub.scores.total),
                        _id: sub.scores._id,
                    });
                    grandTotal += toInt(sub.scores.total);
                }
            }
            if (oneStudentResult.length > 0) {
                resultSheet[student._id] = {student, subjects: oneStudentResult, result: null};
                const average = grandTotal > 0 ? parseFloat((grandTotal / oneStudentResult.length).toFixed(2)) : 0;
                if (grandTotal)
                    oneClass.results.push({
                        student,
                        total: grandTotal,
                        average,
                        // position: '',
                    });
            }
        }

        const sortedResult = oneClass.results.sort((r1, r2) => toInt(r2.total) - toInt(r1.total));
        const classResults = [];
        for (let i = 0; i < sortedResult.length; i++) {
            const record = sortedResult[i];
            if (i === 0) {
                record.position = setPosition(i + 1);
                classResults.push(record);
            } else {
                const prevRecord = sortedResult[i - 1]
                if (prevRecord.average === record.average) {
                    record.position = prevRecord.position;
                    classResults.push(record);
                } else {
                    record.position = setPosition(i + 1);
                    classResults.push(record);
                }
            }
            
            resultSheet[record.student._id].result =  {
                total: record.total,
                average: record.average,
                position: record.position,
            };
        }
        oneClass.results = classResults;
        await termGradeBook.save();
        res.json(resultSheet);

    } catch (err) {
        console.log(err);
        res.status(401).json(err.message)
    }
}

exports.fetch_results_sheet = async (req, res) => {

    try {
        const { session, term, class_name } = req.query;
        const [oneClass, termGradeBook] = await getOneClass(session, term, class_name, true);
        const resultSheet = {};
        const studentsList = [];

        for(const student of oneClass.students){
            resultSheet[student._id] = {student, subjects: [], result: {}};
            studentsList.push(student._id.toString());
        }

        for(const subject of oneClass.subjects){
            const studentsPerSubject = []; //List of students that do a subject

            for(const grade of subject.grades){
                studentsPerSubject.push(grade.student.toString())
                resultSheet[grade.student].subjects.push({
                    title: subject.title,
                    code: subject.code,
                    total: toInt(grade.scores.total),
                    _id: grade.scores._id,
                });
            }

            const stuNotForSubject = studentsList.filter(s => !studentsPerSubject.includes(s))
            if(Array.isArray(stuNotForSubject) && stuNotForSubject.length > 0){
                for(const s of stuNotForSubject){
                    resultSheet[s].subjects.push({
                        title: subject.title,
                        code: subject.code,
                        total: '',
                        _id: '',
                    });
                }
            }
        }

        for(const result of oneClass.results){
            resultSheet[result.student].result = result;
        }

        res.json(resultSheet);

    } catch (err) {
        console.log(err);
        res.status(404).json(err.message)
    }
}

exports.get_results_slip = async (req, res) => {
    try {
        const { session, term, class_name, stu_id } = req.query;
        const resultSlip = await getResultSlip(session, term, class_name, stu_id);
        res.json(resultSlip);
    } catch (err) {
        console.log(err);
        res.status(401).json(err.message)
    }
}

exports.fetch_students_class_term = async (req, res) => {
    const { session, term, class_name } = req.query;

    try {
        const [oneClass, termGradeBook] = await getOneClass(session, term, class_name, true, 'students', 'reg_number name gender date_of_birth');
        res.json(oneClass.students);
    }
    catch (err) {
        console.log(err.message)
        res.status(401).json(err.message);
    }
}

exports.delete_student_from_class = async (req, res) => {
    const { session, term, class_name } = req.query;

    try {
        const [oneClass, termGradeBook] = await getOneClass(session, term, class_name, true, 'students', 'reg_number name gender date_of_birth');
        oneClass.students = oneClass.students.filter(student => student._id.toString() !== req.body.id.toString());
        for (const subject of oneClass.subjects) {
            if (subject.grades) {
                subject.grades = subject.grades.filter(grade => grade.student._id.toString() !== req.body.id.toString());
            }
        }
        await termGradeBook.save();
        res.json(oneClass.students);
    }
    catch (err) {
        console.log(err.message)
        res.status(401).json(err.message);
    }
}

exports.fetch_termly_subjects = async (req, res) => {
    const { session, term, class_name } = req.query;

    try {
        const [oneClass, termGradeBook] = await getOneClass(session, term, class_name);
        const arr = [];
        oneClass.subjects.reduce((prev, curr) => {
            prev.push({ title: curr.title, code: curr.code });
            return prev;
        }, arr);
        return res.json(arr);
    }
    catch (err) {
        console.log(err.message)
        res.status(401).json(err.message);
    }
}

exports.delete_subject_from_class_termly_subjects = async (req, res) => {
    const { session, term, class_name } = req.query;

    try {
        const [oneClass, termGradeBook] = await getOneClass(session, term, class_name);
        oneClass.subjects = oneClass.subjects.filter(subject => subject.title !== req.body.subject);
        const arr = [];
        oneClass.subjects.reduce((prev, curr) => {
            prev.push({ title: curr.title, code: curr.code });
            return prev;
        }, arr);
        await termGradeBook.save();
        return res.json(arr);
    }
    catch (err) {
        console.log(err.message)
        res.status(401).json(err.message);
    }
}

exports.check_result = async (req, res) => {
    try {
        const { session, term, class_name, reg_number, pin, serial_number } = req.body;

        const student = await Student.findOne({ reg_number }, 'reg_number');
        // console.log(student);
        if (!student) {
            return res.status(404).json({ message: 'Invalid credentials' });
        }

        const card = await CardDetails.findOne({ pin, serial_number });
        if (!card) {
            return res.status(404).json({ message: 'Invalid credentials' });
        }

        if (card.student) {
            if (card.student.toString() !== student._id.toString()) {
                return res.status(404).json({ message: 'Invalid credentials' });
            }
            if (card.class !== class_name || card.term !== term || card.session !== session) {
                return res.status(401).json({ message: 'You cannot use one card details for two different terms. Get a new card to gain access to this resources' });
            }
        }

        if (card.used_up) {
            return res.status(401).json({ message: 'You cannot use this pin because you have exceed number of usage.' });
        }

        const resultSlip = await getResultSlip(session, term, class_name, student._id);
        if (!resultSlip) {
            return res.status(404).json({ message: 'Is like the class you selected did not match your current class. Please crosss check your credentials and retry.' })
        }

        card.student = student._id;
        card.used = true;
        card.usage_count = card.usage_count + 1;
        card.used_up = card.max_usage <= card.usage_count;
        card.class = class_name;
        card.term = term;
        card.session = session;
        await card.save();

        res.json(resultSlip);
    } catch (err) {
        console.log(err);
        res.status(401).json(err.message)
    }
}