const {Schema, model} = require('mongoose');
const AddressSchema = require('./address-schema');

const StaffSchema = new Schema({
    username: {type: String, require: true, lowercase: true, unique: true, minlength: 8, trim: true},
    password: {type: String, require: true, trim: true},
    email: {type: String, lowercase: true,  require: true, unique: true, trim: true},
    last_name: {type: String, trim: true, default: ""},
    first_name: {type: String, trim: true, default: ""},
    other_names: {type: String, trim: true, default: ""},
    gender: {type: String, enum: ["male", "female", ""], default: ""},
    join_date: {type: Date, default: Date.now()},
    roles: {type: [String], enum: ["teacher", "cleaner", "class attendant", "admin", "super-admin", "bursar"], default: "teacher"},
    subjects: [String],
    address: {type: AddressSchema, default: {}},
    phone_number: String,
    key_code: String,
})

module.exports = model("Staff", StaffSchema, "Staffs");