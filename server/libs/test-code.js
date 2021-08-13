let i = 0;

const phoneNumberValidator = (phoneNumber = '') => {
  const phoneRegex = /\+?\s?(234|0)\d?\s?\d{1,4}\s?\d{1,4}\s?\d{1,4}/;
  // const r1 = /\+\d{13}/;
  // const r2 = /\d{11}/;
  return phoneRegex.test(phoneNumber);
}


const formatPhoneNumber = (phoneNumber = '') => {
  const phRegex1 = /^\+\d{13}$/; //test for numbers with international code
  const phRegex2 = /^\d{11}$/; //test for numbers in local format
  const wsRegex = /\s/g; //remove all white spaces
  let noWhiteSpaceNum = phoneNumber.replace(wsRegex, '');
  if (noWhiteSpaceNum.length > 11 && noWhiteSpaceNum.length < 14 && !noWhiteSpaceNum.startsWith('+', 0)) {
    noWhiteSpaceNum = `+${noWhiteSpaceNum}`;
  }

  if (phRegex1.test(noWhiteSpaceNum) || phRegex2.test(noWhiteSpaceNum)) {
    return noWhiteSpaceNum
  }
  return '';
}

const test = nu => {
  console.log(formatPhoneNumber(nu) !== '');
}
test('+234 702 400 6013');
test('234 702 400 6013');
test('234 702 4006 013');
test('+2347024006013');
test('+23470240060193');
test('+23470240013');
test('+234702400613');
test('++234024613');
test('0702 400 6013');
test('07024006013');


// "use strict";
// const nodemailer = require("nodemailer");

// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass, // generated ethereal password
//     },
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);
