const {Schema} = require('mongoose');

const AddressSchema = new Schema({
    address: {type: String, default: ""},
    City: {type: String, default: ""},
    town: {type: String, default: ""},
    postal_code: {type: String, default: ""},
    lga: {type: String, default: ""},
    State: {type: String, default: ""},
    Country: {type: String, default: ""},
})

module.exports = AddressSchema;