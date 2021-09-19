const {Schema, model} = require('mongoose');

const joinLink = {
    link: String,
    used: {type: Boolean, default: false},
    used_time: Date
};

const StaffRegTokenSchema = new Schema({
    email: {type: String, require: true, trim: true},
    req_date: {type: Date, default: Date.now()},
    phone_number: String,
    join_link: joinLink,
    key_code: String,
    token: String,
    email_id: String,
    roles: {type: [String], enum: ["teacher", "cleaner", "class attendant", "admin", "super-admin", "bursar"]},
})

module.exports = model('StaffRegToken', StaffRegTokenSchema);