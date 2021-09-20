const {Schema} = require('mongoose');
const { capitalizeFirstLetter } = require('../libs/utility-functions');

const NameSchema = new Schema({
    last_name: {type: String, require: true, minlength: 3, trim: true, set: capitalizeFirstLetter},
    first_name: {type: String, require: true, minlength: 3, trim: true, set: capitalizeFirstLetter},
    other_names: {type: String, trim: true, set: capitalizeFirstLetter, default: ""},
})

module.exports = NameSchema;