const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({

    projectName: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    technologies: [{
        type: String
    }],

    githubLink: String,

    liveLink: String,

    image: {

        url: String,

        filename: String

    },

    featured: {
        type: Boolean,
        default: false
    },

    category: String,

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Project", projectSchema);