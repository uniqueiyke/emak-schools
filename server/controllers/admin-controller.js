const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const getApikey = require('../libs/gen-api-key');
const sendEmail = require('../libs/send-email');
const staffRegRequestEmail = require('../libs/staff-reg-req-email');
const StaffRegToken = require('../models/staff-registration-token');
const Staff = require('../models/staff');
const Student = require('../models/student');
const Parent = require('../models/parent');
const { isEmptyArrayOrObject, formatPhoneNumber } = require('../libs/utility-functions');
const { validateFormFields } = require('../libs/validate-form-fields');
const createGradeBookManager = require('../models/academic-year');
const { terms } = require('../libs/subjects');
const { hashPW } = require('../libs/password_hash');
const { findClass } = require('../libs/utility-function');

exports.send_staff_register_token = async (req, res) => {
    try {
        const validateErr = validateFormFields(req.body, {
            email: 'email',
            phone_number: 'phone',
            roles: 'array',
            key_code: '',
        });
        if (!isEmptyArrayOrObject(validateErr)) {
            return res.status(404).json(validateErr);
        }

        const { email, phone_number, roles, key_code } = req.body;

        const usedEmail = await Staff.find({ $or: [{ email: email }, { phone_number: phone_number }] });
        if (!isEmptyArrayOrObject(usedEmail)) {
            return res.status(404).json({ message: "An account with this email or phone number already exist." })
        }
        const token = await getApikey();
        const link = `${process.env.origin}/staff/registration?key=${token}`;
        const htmlStr = staffRegRequestEmail(link, req.body.key_code);
        const info = await sendEmail(req.body.email, htmlStr, "Registration token for emak schools staff");

        const staffToken = new StaffRegToken({
            email,
            phone_number: formatPhoneNumber(phone_number),
            key_code,
            token,
            roles,
            join_link: { link },
            email_id: info.messageId,
        })

        const addedStaffToken = await staffToken.save();
        res.json(addedStaffToken)
    } catch (error) {
        res.status(404).json(error);
    }
}

exports.fetch_all_students = async (req, res) => {

    try {
        const students = await Student.find();
        res.json(students);
    }
    catch (err) {
        res.status(401).json(err.message);
    }
}

exports.fetch_current_students = async (req, res) => {

    try {
        const students = await Student.find({ status: 'student' });
        res.json(students);
    }
    catch (err) {
        res.status(401).json(err.message);
    }
}

exports.create_result_manager = async (req, res) => {
    try {
        const { session, term, class_name, students_list } = req.body;
        let count = 0;
        const GradeBookManager = createGradeBookManager(session);
        let gradeBookTerm = await GradeBookManager.findOne({ term });

        console.log(students_list)
        if (gradeBookTerm) {
            const cClass = findClass(gradeBookTerm.classes, class_name);
            if (cClass) {
                for (const stu_id of students_list) {
                    const student = cClass.students.find(s => s.toString() === stu_id);
                    if (!student) {
                        cClass.students.push(stu_id);
                        count++;
                    }
                }
            } else {
                gradeBookTerm.classes.push({
                    class_name,
                    students: students_list
                });
                count = students_list.length;
            }
        } else {
            gradeBookTerm = new GradeBookManager({
                term,
                classes: [ {
                    class_name,
                    students: students_list,
                }]
            })

            count = students_list.length;
        }

        await gradeBookTerm.save();

        const message = count > 0 ? `${count} ${count === 1 ? 'student' : 'students'} added to ${class_name.toUpperCase().replace('_', '')}` : 'No new student added. The students selected might have been added earlier.';
        res.json({ message: `Result Manager Created. ${message}` });

    } catch (error) {
        console.log(error.message)
        if (error.code) {
            if (error.code === 11000) {
                res.status(401).json({ message: 'You are trying to add a student in two different classes. This is not allowed.' })
            }
        }
        res.status(401).json({ message: error.message })
    }
}

exports.fetch_all_staffs = async (req, res) => {

    try {
        const staffs = await Staff.find();
        res.json(staffs);
    }
    catch (err) {
        res.status(401).json(err.message);
    }
}

exports.update_staff_roles = async (req, res) => {
    try {
        const staff = await Staff.findOne({ _id: req.body.id });
        staff.roles = req.body.roles;
        await staff.save();

        const staffs = await Staff.find();
        res.json(staffs);
    } catch (err) {
        res.status(401).json(err.message);
    }

}

exports.update_staff_sujects = async (req, res) => {
    try {
        const staff = await Staff.findOne({ _id: req.body.id });
        staff.subjects = req.body.subjects;
        await staff.save();

        const staffs = await Staff.find();
        res.json(staffs);
    } catch (err) {
        res.status(401).json(err.message);
    }

}

exports.admin_register_staff = async (req, res) => {
    try {

        //Validate the data from the user inputs
        const validateErr = validateFormFields(req.body, {
            password: 'password',
            password_match: 'password_match',
            username: 'min_length',
            email: 'email',
            phone_number: 'phone',
        }, { minLength: 8 });
        if (!isEmptyArrayOrObject(validateErr)) {
            return res.status(404).json(validateErr);
        }

        const {
            username,
            email,
            phone_number,
            password,
            roles
        } = req.body;

        //Check if the is a user with the provided email already
        const alreadyAcct = await Staff.findOne({ $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }, { phone_number: phone_number }] });
        if (alreadyAcct) {
            let message = {};
            if (alreadyAcct.username === username) {
                message.username = `${username} is not available`;
            }

            if (alreadyAcct.email === email || alreadyAcct.phone_number === phone_number) {
                message.email = `An account with either email: ${email} or phone number: ${phone_number} already exist`;
            }
            return res.status(400).json({ message });
        }

        const hash = await hashPW(password);

        const newStaff = new Staff({
            username,
            email,
            phone_number: formatPhoneNumber(phone_number),
            password: hash,
            roles,
        });

        await newStaff.save();

        const staffs = await Staff.find()
        res.json(staffs);
    } catch (error) {
        console.log(error.message);
        res.status(401).json(error.message);
    }

}

exports.admin_reset_password = async (req, res) => {
    try {
        const {
            new_password,
            password_match,
            email,
            phone_number,
            username,
            id
        } = req.body

        if (new_password !== password_match) {
            return res.status(401).json({ message: 'The password did not match', success: false })
        }

        const staff = await Staff.findOne({ _id: id });

        if (staff.email !== email || staff.phone_number !== phone_number || staff.username !== username) {
            return res.status(401).json({ message: 'No matching user', success: false })
        }

        const hash = await hashPW(new_password);
        staff.password = hash;
        await staff.save();
        res.json({ message: 'The staff password has been changed.', success: true })
    }
    catch (error) {
        res.status(401).json({ message: error.message, success: false });
    }
}

exports.update_student_class = async (req, res) => {
    try {
        const students = await Student.find({ status: 'student' }, ['current_class', 'status', 'graduated_at', 'classes_been']);
        for (let student of students) {
            if (student.current_class === 'jss1') {
                student.current_class = 'jss2';
                if (!student.classes_been.includes('jss1')) {
                    student.classes_been.push('jss1');
                }
                if (!student.classes_been.includes('jss2')) {
                    student.classes_been.push('jss2');
                }
            } else if (student.current_class === 'jss2') {
                student.current_class = 'jss3';
                if (!student.classes_been.includes('jss2')) {
                    student.classes_been.push('jss2');
                }
                if (!student.classes_been.includes('jss3')) {
                    student.classes_been.push('jss3');
                }
            } else if (student.current_class === 'jss3') {
                student.current_class = 'ss1';
                if (!student.classes_been.includes('jss3')) {
                    student.classes_been.push('jss3');
                }
                if (!student.classes_been.includes('ss1')) {
                    student.classes_been.push('ss1');
                }
            } else if (student.current_class === 'ss1') {
                student.current_class = 'ss2';
                if (!student.classes_been.includes('ss1')) {
                    student.classes_been.push('ss1');
                }
                if (!student.classes_been.includes('ss2')) {
                    student.classes_been.push('ss2');
                }
            } else if (student.current_class === 'ss2') {
                student.current_class = 'ss3';
                if (!student.classes_been.includes('ss2')) {
                    student.classes_been.push('ss2');
                }
                if (!student.classes_been.includes('ss3')) {
                    student.classes_been.push('ss3');
                }
            } else if (student.current_class === 'ss3') {
                student.current_class = 'graduate';
                student.status = 'graduate';
                if (!student.classes_been.includes('ss3')) {
                    student.classes_been.push('ss3');
                }
            }
            await student.save();
        }
        res.json({ message: 'Classes updated successfully' });
    } catch (err) {
        res.status(401).json(err.message);
    }
}

exports.fetcch_parents = async (req, res) => {
    try {
        const parents = await Parent.find({}, ['name', 'phone_number', 'email', 'relationship', 'children'])
            .populate('children', 'name');
        res.json(parents)
    } catch (error) {
        res.status(401).json(error.message);
    }
}