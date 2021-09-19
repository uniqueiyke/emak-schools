const {Schema} = require('mongoose');

const AddressSchema = new Schema({
    address: String,
    City: String,
    town: String,
    postal_code: String,
    lga: String,
    State: String,
    Country: String,
})

module.exports = AddressSchema;