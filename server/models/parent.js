const {Schema, model} = require('mongoose');
const AddressSchema = require('./address-schema');
const NameSchema = require('./name-schema');

const ParentSchema = new Schema({
    name: {type: NameSchema, default: () => ({})},
    phone_number: {type: String, default: ""},
    email: {type: String, lowercase: true , default: ""},
    occpation: {type: String, default: ""},
    office: {type: AddressSchema, default: () => ({})},
    children: [{type: Schema.Types.ObjectId, ref: 'Student'}],
})

module.exports = model("Parent", ParentSchema, "Parents");