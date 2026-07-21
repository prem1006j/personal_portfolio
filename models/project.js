const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    projectName: {
        type:String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    technologies:{
        type: [String],
        required: true,
    },
    githubLink: {
        type: String,
    },
    liveLink: {
        type: String,
    },
    image: {
        type: String,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    category: {
        type: String,
    },
    createdAt: {
        type : Date,
        default: Date.now,
    },
});

const Project = mongoose.model("Project", projectSchema);
module.exports= Project;