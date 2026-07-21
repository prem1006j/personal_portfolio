const mongoose = require("mongoose");
const initData = require("./data.js")

const Profile = require("../models/profile");
const Project = require("../models/project");
const Skill = require("../models/skill");
const Experience = require("../models/experience");
const Education = require("../models/education");
const Contact = require("../models/contact");

const MONGO_URL = "mongodb://127.0.0.1:27017/prem_portfolio";

async function main() {
    await mongoose.connect(MONGO_URL);
}

main()
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });


const initDB = async () => {
        await Profile.deleteMany({});
        await Project.deleteMany({});
        await Skill.deleteMany({});
        await Experience.deleteMany({});
        await Education.deleteMany({});
        await Contact.deleteMany({});

        await Profile.create(initData.profileData);
        await Project.insertMany(initData.projectsData);
        await Skill.insertMany(initData.skillsData);
        await Experience.insertMany(initData.experiencesData);
        await Education.insertMany(initData.educationData);
        await Contact.insertMany(initData.contactsData);

        console.log("data was initialized");
}

initDB();