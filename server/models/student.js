const {Schema, model} = require('mongoose');
const AddressSchema = require('./address-schema');
const NameSchema = require('./name-schema');

const StudentRegSchema = new Schema({
    serial_number: {type: Number, require: true, unique: true},
    reg_number: {type: String, require: true, trim: true, unique: true},
    name: {type: NameSchema, default: () => ({})},
    gender: {type: String, enum: ["male", "female"], default: "male"},
    date_of_birth: {type: Date},
    graduated: {type: Boolean, default: false},
    left_the_school: {type: Boolean, default: false},
    reg_class: {type: String, enum: ["JS 1", "JS 2", "JS 3", "SS 1", "SS 2", "SS 3"], default: "JS 1"},
    current_class: {type: String, enum: ["JS 1", "JS 2", "JS 3", "SS 1", "SS 2", "SS 3", "none"], default: "JS 1"},
    classes_been: {type: [String], enum: ["JS 1", "JS 2", "JS 3", "SS 1", "SS 2", "SS 3"]},
    reg_date: {type: Date, default: Date.now()},
    email: String,
    phone_number: String,
    blood_group: {type: String, enum: ["", "A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-" ], default: ""},
    genotype: {type: String, enum: ["", "AA", "AC", "AS", "SC", "SS"], default: ""},
    height: Number,
    weight: Number,
    last_sch_attend: String,
    res_home_address: {type: AddressSchema, default: {}},
    pemt_home_address: {type: AddressSchema, default: {}},
    parent_id: {type: Schema.Types.ObjectId, ref: 'Parent'}
})

module.exports = model('Student', StudentRegSchema, 'Students');