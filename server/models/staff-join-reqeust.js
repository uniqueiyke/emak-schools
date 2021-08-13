const {Schema, model} = require('mongoose');

const joinLink = {
    link: String,
    used: {type: Boolean, default: false},
    used_time: Date
};

const StaffToJoinSchema = new Schema({
    username: {type: String, require: true, unique: true, minlength: 8, trim: true},
    password: {type: String, require: true, trim: true},
    email: {type: String, require: true, unique: true, trim: true},
    req_date: {type: Date, default: Date.now()},
    phone_number: String,
    join_link: joinLink
})

module.exports = model('StaffToJoin', StaffToJoinSchema);