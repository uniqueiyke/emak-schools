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
const { signInToken } = require('../libs/sign-in-token');
const { hashPW, isPwMatch } = require('../libs/password_hash');

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
        const alreadyAcct = await Staff.findOne({ $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }, { phone_number: phone_number }] });
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

        const hash = await hashPW(req.body.password);

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
        // res.json(error);
        res.status(401).json(error.message);
    }

}



exports.login_staff = async (req, res) => {
    try {
        const { username, password } = req.body;
        const usernameL = username.toLowerCase();
        const staff = await Staff.findOne({ $or: [{ email: usernameL }, { username: usernameL }, { phone_number: usernameL }] });
        if (!staff) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await isPwMatch(password, staff.password);
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

        if (getTimeElapse(data.req_date) > 259200) {
            return res.status(400).json({ message: "This link has expired. Call the schooladministrator to resend another link." })
        }

        res.json(data);
    } catch (err) {
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
            } else if (field === 'subjects') {
                err = validateFormFields({ [field]: req.body[field] }, { [field]: 'array' });
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

        const passwordHash = await hashPW(password);
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

exports.staff_reset_password = async (req, res) => {
    try {
        const {
            old_password,
            new_password,
            password_match,
            email,
            phone_number,
            username,
            id
        } = req.body

        if (new_password !== password_match) {
            return res.status(401).json({ message: 'The old password you provided is incorrect', success: false })
        }

        const staff = await Staff.findOne({ _id: id });

        const isMatch = await isPwMatch(old_password, staff.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials", success: false });
        }

        if (staff.email !== email || staff.phone_number !== phone_number || staff.username !== username) {
            return res.status(401).json({ message: "Invalid credentials", success: false })
        }

        const hash = await hashPW(new_password);
        console.log(hash)
        staff.password = hash;
        await staff.save();
        res.json({message: 'Your password has been changed.', success: true})
    }
    catch (error) {
        res.status(401).json({message: error.message, success: false});
    }
}