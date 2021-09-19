const {Schema, model} = require('mongoose');

const StaffPasswordResetSchema = new Schema({
    email: {type: String, unique: true, require: true, trim: true},
    old_passwords: [String],
    staff_id: {type: Schema.Types.ObjectId, ref: 'Staff'},
    reset_code: String,
    code_date: {type: Date, default: Date.now()},
    old_reset_codes: [String],
})

module.exports = model('StaffPasswordReset', StaffPasswordResetSchema);