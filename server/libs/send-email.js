"use strict";
const nodemailer = require("nodemailer");

const sendEmail = async (staffEmail, msg, subject) => {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.email,
                pass: process.env.emailPW,
            },
        });
        let info = await transporter.sendMail({
            from: process.env.email, // sender address
            to: staffEmail, // list of receivers
            subject: subject, // Subject line
            html: msg, // html body
        });

        return info;
    } catch (error) {
        throw error;
    }
}

module.exports = sendEmail;
