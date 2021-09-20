const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Staff = require('../models/staff');
const StaffRegToken = require('../models/staff-registration-token');
const getApikey = require('../libs/gen-api-key');
const { formatPhoneNumber, isEmptyArrayOrObject, getTimeElapse } = require('../libs/utility-functions');
const FormFieldsValidator = require('../libs/form-fields-validator');
const { validateFormFields } = require('../libs/validate-form-fields');
const generateCodeOfLenth = require('../libs/generate-random-code');
const sendEmail = require('../libs/send-email');
const StaffPasswordReset = require('../models/staff-password-reset');
const passwordResetEamil = require('../libs/password-reset-email');
const successfulPasswordReset = require('../libs/successful-password-reset');
const signInToken = (userData) => {
    return jwt.sign(
        { user: { id: userData._id, roles: userData.roles } },
        process.env.jwtSecret,
        { expiresIn: 86400 },
    )
}
const SALT_ROUND = 10;

exports.register_staff = async (req, res) => {
    try {

        //Validate the data from the user inputs
        const validateErr = validateFormFields(req.body, {
            password: 'password',
            password_match: 'password_match',
            username: 'min_length',
            email: 'email',
            phone_number: 'phone',
            key_code: ''
        }, { minLength: 8 });
        if (!isEmptyArrayOrObject(validateErr)) {
            return res.status(404).json(validateErr);
        }

        const {
            username,
            email,
            phone_number,
            key_code
        } = req.body;

        //Check if the is a user with the provided email already
        const alreadyAcct = await Staff.findOne({ $or: [{ email: email }, { username: username }, { phone_number: phone_number }] });
        if (alreadyAcct) {
            let message = {};
            if (alreadyAcct.username === username) {
                message.username = `${username} is not available`;
            }

            if (alreadyAcct.email === email || alreadyAcct.phone_number === phone_number) {
                message.email = `${email} or ${phone_number} is not available. Is like you've created an account before consult the school admin for assisstance`;
            }
            return res.status(400).json({ message });
        }

        //Authenticate that the user has been authorised to sign in to the platform
        let data = await StaffRegToken.find({ token: req.query.token })
        data = data[0];

        if (
            !(data.phone_number === phone_number &&
                data.key_code === key_code &&
                data.email === email)
        ) {
            return res.status(403).json({ message: "You are not Authorised to sign up on this platform. Please meet with the school admistrator for help" });
        }
        if (data.join_link.used === true) {
            return res.status(400).json({ message: "This link has been use. login instead" })
        }

        if (getTimeElapse(data.req_date) > 259200) {
            return res.status(400).json({ message: "This link has expired. Call the schooladministrator to resend another link." })
        }

        const hash = await bcrypt.hash(req.body.password, SALT_ROUND);

        const newStaff = new Staff({
            username,
            email,
            phone_number: formatPhoneNumber(phone_number),
            password: hash,
            key_code,
            roles: data.roles,
        });

        const staff = await newStaff.save();

        // update StaffRegToken
        data.join_link.used = true;
        await data.save();

        const token = signInToken(staff);

        res.json({
            token,
            staff_data: staff
        });
    } catch (error) {
        res.json(error);
    }

}



exports.login_staff = async (req, res) => {
    try {
        const { username, password } = req.body;

        const staff = await Staff.findOne({ $or: [{ email: username }, { username: username }, { phone_number: username }] });
        if (!staff) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, staff.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = signInToken(staff);
        res.json({
            token,
            staff_data: staff
        });
    } catch (error) {
        res.status(401).json(error.message);
    }
}



exports.get_staff = async (req, res) => {
    try {
        const staff = await Staff.findById(req.staff_token.user.id);
        if (!staff) {
            return res.status(400).json({ message: "User not found" });
        }
        const token = signInToken(staff);
        res.json({
            token,
            staff_data: staff
        });
    } catch (error) {
        res.status(401).json(error.message);

    }
}

exports.confirm_staff_reg_token = async (req, res) => {
    try {
        console.log(req.query);
        if (isEmptyArrayOrObject(req.query)) {
            res.status(400).json({ message: 'No access token' });
            return;
        }
        let data = await StaffRegToken.find({ token: req.query.token })
        if (isEmptyArrayOrObject(data)) {
            res.status(401).json({ message: 'Wrong or expired access token' });
            return;
        }
 
        data = data[0];

        if (data.join_link.used === true) {
            return res.status(400).json({ message: "This link has been use. login instead" })
        }

        if (getTimeElapse(data.req_date) > 72) {
            return res.status(400).json({ message: "This link has expired. Call the schooladministrator to resend another link." })
        }

        res.json(data);
    } catch (err) {
        console.log(err.message);
        res.status(404).json(err.message);
    }
}

exports.update_staff_data = async (req, res) => {
    try {
        const fields = Object.keys(req.body);
        const staff = await Staff.findById(req.staff_token.user.id);
        if (!staff) {
            return res.status(400).json({ message: "User not found" });
        }
        for (const field of fields) {
            let err = null;
            if (field === 'email') {
                err = validateFormFields({ [field]: req.body[field] }, { [field]: 'email' });
            }
            else if (field === 'phone_number') {
                err = validateFormFields({ [field]: req.body[field] }, { [field]: 'phone' });
            }
            else if (field === 'username') {
                err = validateFormFields({ [field]: req.body[field] }, { [field]: 'min_length' }, { minLength: 8 });
            } else {
                err = validateFormFields({ [field]: req.body[field] }, {
                    [field]: 'min_length',
                }, { optionalFields: ['other_names'], minLength: 3 })
            }
            if (!isEmptyArrayOrObject(err)) {
                return res.status(400).json([err, 'updateErr']);
            }
            staff[field] = req.body[field];
        }
        await staff.save();

        res.json({
            staff_data: staff
        });
    } catch (error) {
        res.status(401).json(error.message);

    }
}

exports.confirm_email = async (req, res) => {
    try {
        const { email } = req.body;

        const staff = await Staff.findOne({ email });
        if (!staff) {
            return res.status(400).json({ message: "No such email address. Please enter the email with which you create the account" });
        }

        const resetPasswordCode = await generateCodeOfLenth(9, 'nu');


        const staffResetDetails = await StaffPasswordReset.findOne({ email });
        if (staffResetDetails) {
            staffResetDetails.reset_code && staffResetDetails.old_reset_codes.push(staffResetDetails.reset_code)
            staffResetDetails.reset_code = resetPasswordCode;
            staffResetDetails.code_date = Date.now();
            await staffResetDetails.save();
        } else {
            const newResetDetail = new StaffPasswordReset({
                email,
                staff_id: staff._id,
                reset_code: resetPasswordCode,
            });
            await newResetDetail.save();
        }
        await sendEmail(email, passwordResetEamil(resetPasswordCode), "Password reset code");
        res.json({
            confirmed: 'An email has been to your emial box. Use the provide code to reset your password',
        });
    } catch (error) {
        res.status(401).json(error.message);
    }
}

exports.reset_password = async (req, res) => {
    try {
        const { password, password_match, reset_code } = req.body;
        const validateErr = validateFormFields(req.body, {
            password: 'password',
            password_match: 'password_match',
            reset_code: ''
        });

        if (!isEmptyArrayOrObject(validateErr)) {
            return res.status(404).json(validateErr);
        }

        const staffPWReset = await StaffPasswordReset.findOne({ reset_code });
        if (!staffPWReset) {
            return res.status(400).json({ message: "Cannot continue with this activity. There is no reset code" });
        }

        if (getTimeElapse(staffPWReset.code_date) > 1800) {
            return res.status(400).json({ message: "This code has expired after thirty minuites." });
        }


        const staff = await Staff.findById(staffPWReset.staff_id);
        if (!staff) {
            return res.status(400).json({ message: "Unidentify user. you do not have an account with us" });
        }

        const passwordHash = await bcrypt.hash(password, SALT_ROUND);
        staffPWReset.old_reset_codes.push(staffPWReset.reset_code);
        staffPWReset.reset_code = undefined;
        staffPWReset.old_passwords.push(staff.password);
        staff.password = passwordHash;

        await staff.save();

        await staffPWReset.save();

        await sendEmail(staffPWReset.email, successfulPasswordReset(), "Password reset successful");
        const token = signInToken(staff);
        res.json({
            token,
            staff_data: staff
        });
    } catch (error) {
        res.status(401).json(error.message);
    }
}