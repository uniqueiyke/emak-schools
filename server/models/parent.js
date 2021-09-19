const {Schema, model} = require('mongoose');
const AddressSchema = require('./address-schema');
const NameSchema = require('./name-schema');

const ParentSchema = new Schema({
    name: {type: NameSchema, default: () => ({})},
    phone_number: String,
    email: String,
    occpation: String,
    office: {type: AddressSchema, default: () => ({})},
    children: [{type: Schema.Types.ObjectId, ref: 'Student'}],
})

module.exports = model("Parent", ParentSchema, "Parents");