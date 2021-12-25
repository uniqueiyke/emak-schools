const {Schema, model} = require('mongoose');

const CardDetailsSchema = new Schema({
    student: {type: Schema.Types.ObjectId, ref: 'Student'},
    serial_number: {type: String, uppercase: true , unique: true, default: ""},
    pin: {type: String, unique: true, require: true, default: ""},
    used: {type: Boolean, default: false},
    max_usage: {type: Number, default: 5},
    usage_count: {type: Number, default: 0},
    used_up: {type: Boolean, default: false},
    created_date: {type: Date, default: Date.now()},
    printed: {type: Boolean, default: false},
})

module.exports = model("CardDetails", CardDetailsSchema, "CardDetails");