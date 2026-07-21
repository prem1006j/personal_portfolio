const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Profile = require("./models/profile");
const Project = require("./models/project");
const Skill = require("./models/skill");
const Experience = require("./models/experience");
const Education = require("./models/education");
const Contact = require("./models/contact");
const path = require("path");

const MONGO_URL = "mongodb://127.0.0.1:27017/prem_portfolio";

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

const methodOverride = require("method-override");

app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
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
});

app.get("/projects/:id", async (req , res) =>{ 
    const {id} = req.params;
    const project = await Project.findById(id);

    res.render("portfolio/show" , { project });
});

app.get("/projects/new", (req, res) => {
    res.render("portfolio/new");
});

app.post("/projects", async (req, res) => {

    const project = new Project({
        projectName: req.body.projectName,
        description: req.body.description,
        technologies: req.body.technologies.split(","),
        githubLink: req.body.githubLink,
        liveLink: req.body.liveLink,
        image: req.body.image,
        category: req.body.category
    });

    await project.save();

    res.redirect("/");
});

app.get("/projects/:id/edit", async (req, res) => {

    const { id } = req.params;

    const project = await Project.findById(id);

    res.render("portfolio/edit", { project });

});

app.put("/projects/:id", async (req, res) => {

    const { id } = req.params;

    await Project.findByIdAndUpdate(id, req.body);

    res.redirect(`/projects/${id}`);

});

app.delete("/projects/:id", async (req, res) => {

    const { id } = req.params;

    await Project.findByIdAndDelete(id);

    res.redirect("/");

});

const portfolioRoutes = require("./routes/portfolio");

app.use("/", portfolioRoutes);

main().then(() => {
    console.log("connected to db")
}).catch(err =>{
    console.log(err);
});

app.listen(8080, () => {
    console.log("server is listening on port 8080");
});


// app.get("/", (req, res) => {
//     res.send("hi i am root");
// });