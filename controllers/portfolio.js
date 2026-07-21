const Profile = require("../models/profile");
const Project = require("../models/project");
const Skill = require("../models/skill");
const Experience = require("../models/experience");
const Education = require("../models/education");

module.exports.index = async (req, res) => {

    const profile = await Profile.findOne({});
    const projects = await Project.find({});
    const skills = await Skill.find({});
    const experiences = await Experience.find({});
    const education = await Education.find({});

    res.render("portfolio/index", {
        profile,
        projects,
        skills,
        experiences,
        education,
    });

};