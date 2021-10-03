const { Schema } = require('mongoose');

function calculateTotal() {
    if (this instanceof Document) {
        return this.first_test + this.second_test + this.third_test + this.continueous_assessment + this.exam;
    }
}

const GradeBookScoreSchema = new Schema({
    first_quiz: { type: Number, default: 0 },
    second_quiz: { type: Number, default: 0 },
    third_quiz: { type: Number, default: 0 },
    c_a: { type: Number, default: 0 },
    exam: { type: Number, default: 0 },
    total: { type: Number },
    position: { type: String, default: "" },
})

GradeBookScoreSchema.virtual('total').get(function () {
    if (this instanceof Document) {
        return this.first_test + this.second_test + this.third_test + this.continueous_assessment + this.exam;
    }
})

module.exports = GradeBookScoreSchema;