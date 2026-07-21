const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const experienceSchema = new Schema({
    companyName: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        required: true,
    },

    location: {
        type: String,
        required: true,
    },

    employmentType: {
        type: String,
    },

    startDate: {
        type: Date,
        required: true,
    },

    endDate: {
        type: Date,
    },

    currentlyWorking: {
        type: Boolean,
        default: false,
    },

    description: {
        type: [String],
        required: true,
    },

    technologies: {
        type: [String],
    },
});

const Experience = mongoose.model("Experience", experienceSchema);

module.exports = Experience;