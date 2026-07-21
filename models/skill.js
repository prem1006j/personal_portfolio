const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const skillSchema = new Schema({
    category: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
        required: true,
    },
});

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;