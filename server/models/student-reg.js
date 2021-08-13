const {Schema, model} = require('mongoose');

const StudentRegSchema = new Schema({
    serial_number: {type: Number, require: true, unique: true},
    reg_number: {type: String, require: true, trim: true, unique: true},
    last_name: {type: String, require: true, minlength: 3, trim: true},
    first_name: {type: String, require: true, minlength: 3, trim: true},
    other_names: {type: String, require: true, trim: true},
    gender: {type: String, enum: ["male", "female"], default: "male"},
    date_of_birth: {type: Date},
    reg_class: {type: String, default: "JSS 1"},
    reg_date: {type: Date, default: Date.now()}
})

module.exports = model('StudentReg', StudentRegSchema);