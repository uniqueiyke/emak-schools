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
const { hashPW } = require('../libs/password_hash');

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
            console.log(`error occured: ${message}`)
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
        console.log(hash)
        staff.password = hash;
        await staff.save();
        res.json({message: 'The staff password has been changed.', success: true})
    }
    catch (error) {
        res.status(401).json({message: error.message, success: false});
    }
}