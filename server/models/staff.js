const {Schema, model} = require('mongoose');

const StaffSchema = new Schema({
    username: {type: String, require: true, unique: true, minlength: 8, trim: true},
    password: {type: String, require: true, trim: true},
    email: {type: String, require: true, unique: true, trim: true},
    last_name: {type: String, require: true, minlength: 3, trim: true},
    first_name: {type: String, require: true, minlength: 3, trim: true},
    other_names: {type: String, require: true, trim: true},
    gender: {type: String, enum: ["male", "female"], default: "male"},
    join_date: {type: Date, default: Date.now()},
    role: {type: String, enum: ["teacher", "cleaner", "class attendant", "admin", "super-admin"], default: "class attendant"},
    subjects: [String],
    phone_number: String
})

module.exports = model('Staff', StaffSchema);