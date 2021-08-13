const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Staff = require('../models/staff');
const StaffToJoin = require('../models/staff-join-reqeust');

// const getApiKey = require('../lib/gen-api-key');
const { formatPhoneNumber } = require('../libs/utility-functions');
const FormFieldsValidator = require('../libs/form-fields-validator');

const SALT_ROUND = 10;



exports.register_new_staff = async (req, res) => {
    try {
        const alreadyAcct = await Staff.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] });
        if (alreadyAcct) {
            let message = {};
            if (alreadyAcct.username === req.body.username) {
                message.username = `${req.body.username} is not available`;
            }

            if (alreadyAcct.email === req.body.email) {
                message.email = `${req.body.email} is not available. Is like you already have an account with ${req.body.email}. Sign in instead.`;
            }

            return res.status(400).json({ message });
        }
        const formFieldsValidator = new FormFieldsValidator(req.body);
        formFieldsValidator.field('last_name').trim().isLength({ minLength: 3 }).withMessage('Name is too short');
        formFieldsValidator.field('first_name').trim().isLength({ minLength: 3 }).withMessage('Name is too short');
        formFieldsValidator.field('username').trim().isLength({ minLength: 8 }).withMessage('username is too short');
        formFieldsValidator.field('email').trim().isValidEmail({ minLength: 3 }).withMessage('Please enter a valid email address');
        formFieldsValidator.field('password_match').isStringMatch(req.body.password, req.body.password_match)
            .withMessage('The password did not match');
        formFieldsValidator.field('password').isPasswordStrong().withMessage('This password is too weak. Your password should have at least one upper case leter, one lower case letter, one nomber and one special character');
        const errors = formFieldsValidator.errorMessage();

        if (JSON.stringify(errors) !== "{}") {
            return res.status(400).json({ message: valErr });
        }
        const hash = await bcrypt.hash(req.body.password, SALT_ROUND);
        const {
            first_name,
            last_name,
            username,
            gender,
            email,
            phone_number
        } = req.body;

        const newStaff = new Staff({
            first_name,
            last_name,
            username,
            email,
            gender,
            phone_number,
            password: hash,
        });

        const newRegStaff = await newStaff.save();
        console.log(newRegStaff);
        res.json(newRegStaff);
    } catch (error) {
        console.log(error);
        res.json(error);
    }


    // try {

    //     const exitAcct = await Staff.findOne({ $or: [{email: req.body.email}, {username: req.body.username}] });
    //     if (exitAcct) {
    //         let message = {};
    //         if (exitAcct.username === req.body.username) {
    //             message.username = `${req.body.username} is not available`;
    //         }

    //         if (exitAcct.email === req.body.email) {
    //             message.email = `${req.body.email} is not available. Is like you already have an account with ${req.body.email}. Sign in instead.`;
    //         }

    //         return res.status(400).json({message});
    //     }

    //     const valErr = validateInput(req.body);

    //     if(JSON.stringify(valErr) !== '{}'){
    //         return res.status(400).json({message: valErr});
    //     }

    //     const hash = await bcrypt.hash(req.body.password, SALT_ROUND)
    //     const newStaff = new Staff({
    //         username: req.body.username,
    //         email: req.body.email,
    //         password: hash,
    //     });

    //     await newStaff.save();

    //     const token = jwt.sign(
    //         { id: newStaff._id },
    //         process.env.jwtSecret,
    //         { expiresIn: 3600 },
    //     )

    //     res.json({
    //         token, 
    //         staff: {
    //             id: newStaff._id,
    //             username: newStaff.username,
    //             email: newStaff.email,
    //         }
    //     })
    // } catch (error) {
    //     console.log(error);
    //     res.status(401).json(error.message);
    // }
}


exports.init_staff_registration = async (req, res) => {
    try {
        const alreadyAcct = await Staff.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] });
        if (alreadyAcct) {
            let message = {};
            if (alreadyAcct.username === req.body.username) {
                message.username = `${req.body.username} is not available`;
            }

            if (alreadyAcct.email === req.body.email) {
                message.email = `${req.body.email} is not available. Is like you already have an account with ${req.body.email}. Sign in instead.`;
            }

            return res.status(400).json({ message });
        }
        const formFieldsValidator = new FormFieldsValidator(req.body);
        formFieldsValidator.field('username').trim().isLength({ minLength: 8 }).withMessage('username is too short');
        formFieldsValidator.field('email').trim().isValidEmail({ minLength: 3 }).withMessage('Please enter a valid email address');
        formFieldsValidator.field('password_match').isStringMatch(req.body.password, req.body.password_match).withMessage('The password did not match');
        formFieldsValidator.field('password').isPasswordStrong().withMessage('This password is too weak. Your password should have at least one upper case leter, one lower case letter, one nomber and one special character');
        const errors = formFieldsValidator.errorMessage();

        if (JSON.stringify(errors) !== "{}") {
            return res.status(400).json({ message: valErr });
        }

        const hash = await bcrypt.hash(req.body.password, SALT_ROUND);
        const {
            username,
            email,
            phone_number
        } = req.body;

        const formatedPhoneNumber = formatPhoneNumber(phone_number);
        if (!formatedPhoneNumber) {
            errors['phone_number'] = 'Please enter a valid phone number';
        }

        const newStaff = new StaffToJoin({
            username,
            email,
            phone_number: formatedPhoneNumber,
            password: hash,
        });

        const newRegStaff = await newStaff.save();
        console.log(newRegStaff);
        res.json(newRegStaff);
    } catch (error) {
        console.log(error);
        res.json(error);
    }

}



exports.login_staff = [
    async (req, res) => {
        try {
            const staff = await Staff.findOne({ $or: [{ email: req.body.username }, { username: req.body.username }] });
            if (!staff) {
                // console.log('no match user')
                return res.status(400).json({ message: "Invalid credentials" });
            }
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                // console.log('no match password')
                return res.status(400).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign(
                { id: staff._id },
                process.env.jwtSecret,
                { expiresIn: 3600 },
            )

            res.json({
                token,
                staff: {
                    id: staff._id,
                    username: staff.username,
                    email: staff.email
                }
            })
        } catch (error) {
            console.log(error);
            res.status(401).json(error.message);
        }
    }
]


exports.get_staff = async (req, res) => {
    try {
        const staff = await Staff.findById(req.user.id);
        if (!staff) {
            return res.status(400).json({ message: "User not found" });
        }

        res.json({
            id: staff._id,
            email: staff.email,
            username: staff.username
        })
    } catch (error) {
        console.log(error);
        res.status(401).json(error.message);

    }
}

// exports.refresh_api_key = async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id);
//         if(!user){
//             return res.status(400).json({message: "User not found"});
//         }

//         const api_key = await getApiKey();
//         user.api_key = api_key;
//         await user.save()
//         res.json({
//             id: user._id,
//             email: user.email,
//             username: user.username,
//             api_key: user.api_key
//         })
//         // res.json({success: true});
//     } catch (error) {
//         console.log(error);
//         res.status(401).json(error);

//     }
// }

// exports.register_student = async (req, res) => {
//     const {
//         last_name, first_name,
//         other_names, gender,
//         subjects
//     } = req.body;

//     newStaffReg = new StaffModel({
//         last_name, first_name,
//         other_names, gender,
//         subjects
//     })

//     const newStaff = await newStaffReg.save();
//     res.json(newStaff);
// }
