const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const getApikey = require('../libs/gen-api-key');
const sendEmail = require('../libs/send-email');
const staffRegRequestEmail = require('../libs/staff-reg-req-email');
const StaffRegToken = require('../models/staff-registration-token');
const Staff = require('../models/staff');
const Student = require('../models/student');
const { isEmptyArrayOrObject, formatPhoneNumber } = require('../libs/utility-functions');
const { validateFormFields } = require('../libs/validate-form-fields');
const createGradeBookManager = require('../models/session-term-schema');
const { subjects, terms } = require('../libs/subjects');

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
        const GradeBookManager = createGradeBookManager(session, `${terms[term].short_title}`);
        let gradeBookManager = await GradeBookManager.findOne({ class_name });
        if (gradeBookManager) {
            for (const stu_id of students_list) {
                if (!gradeBookManager.students_list.includes(stu_id)) {
                    gradeBookManager.students_list.push(stu_id);
                    count++;
                }
            }
            await gradeBookManager.save();
        } else {
            gradeBookManager = new GradeBookManager({
                class_name,
                students_list,
            })
            await gradeBookManager.save();
            count = students_list.length;
        }
        // const gradeBookManager = new GradeBookManager({})
        const message = count > 0 ? `${count} students added` : 'No student added';
        res.json({ message: `Result Manager Created. ${message}` });

    } catch (error) {
        // console.log(error.message)
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
    }catch (err) {
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
    }catch (err) {
        res.status(401).json(err.message);
    }

}