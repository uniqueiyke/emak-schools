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


exports.send_staff_register_token = async (req, res) => {
    try {
        const validateErr = validateFormFields(req.body,{
            email: 'email',
            phone_number: 'phone',
            roles: 'array',
            key_code: '',
        });
        if(!isEmptyArrayOrObject(validateErr)){
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

    try{
        const students = await Student.find({}).sort({reg_number: -1});
        res.json(students);
    }
    catch(err){
        res.status(401).json(err.message);
    }
}
