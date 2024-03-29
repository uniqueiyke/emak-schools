const {Schema, model} = require('mongoose');
const AddressSchema = require('./address-schema');
const NameSchema = require('./name-schema');

const classEnum = ["jss1", "jss2", "jss3", "ss1", "ss2", "ss3", "graduate", "none"];
const StudentRegSchema = new Schema({
    serial_number: {type: Number, require: true, unique: true},
    reg_number: {type: String, require: true, trim: true, unique: true},
    name: {type: NameSchema, default: () => ({})},
    gender: {type: String, enum: ["male", "female"], default: "male"},
    date_of_birth: {type: Date, default: null},
    status: {type: String, enum: ['graduate', 'left school', 'student', 'indeterminant'], default: 'student'},
    graduated_at: {type: String, enum: ['junior', 'senior', 'both', 'still-student', 'none'], default: 'still-student'},
    reg_class: {type: String, enum: classEnum, default: "jss1"},
    current_class: {type: String, enum: classEnum , default: "none"},
    classes_been: {type: [String], enum: classEnum, default: () => ([])},
    reg_date: {type: Date, default: Date.now()},
    email: {type: String, lowercase: true, default: ""},
    phone_number:  {type: String, default: ""},
    blood_group: {type: String, enum: ["", "A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-" ], default: ""},
    genotype: {type: String, enum: ["", "AA", "AC", "AS", "SC", "SS"], default: ""},
    height:  {type: Number, default: 0},
    weight:  {type: Number, default: 0},
    last_sch_attend:  {type: String, default: ""},
    res_home_address: {type: AddressSchema, default: () => ({})},
    pemt_home_address: {type: AddressSchema, default: () => ({})},
    parent_id: {type: Schema.Types.ObjectId, ref: 'Parent'}
})

module.exports = model('Student', StudentRegSchema, 'Students');