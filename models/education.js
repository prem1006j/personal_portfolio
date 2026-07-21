const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const educationSchema = new Schema({
    institution: {
        type: String,
        required: true,
    },

    degree: {
        type: String,
        required: true,
    },

    fieldOfStudy: {
        type: String,
        required: true,
    },

    startYear: {
        type: Number,
        required: true,
    },

    endYear: {
        type: Number,
        required: true,
    },

    grade: {
        type: String,
    },

    location: {
        type: String,
    },

    description: {
        type: [String],
    },
});

const Education = mongoose.model("Education", educationSchema);

module.exports = Education;