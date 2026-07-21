const Project = require("../models/project");

module.exports.showProject = async (req, res) => {
    const { id } = req.params;

    const project = await Project.findById(id);

    res.render("portfolio/show", { project });
};

module.exports.newProjectForm = (req, res) => {
    res.render("portfolio/new");
};

module.exports.createProject = async (req, res) => {

    const project = new Project({
        projectName: req.body.projectName,
        description: req.body.description,
        technologies: req.body.technologies.split(","),
        githubLink: req.body.githubLink,
        liveLink: req.body.liveLink,
        image: req.body.image,
        category: req.body.category,
    });

    await project.save();

    res.redirect("/");
};

module.exports.editProjectForm = async (req, res) => {

    const { id } = req.params;

    const project = await Project.findById(id);

    res.render("portfolio/edit", { project });
};

module.exports.updateProject = async (req, res) => {

    const { id } = req.params;

    req.body.technologies = req.body.technologies.split(",");

    await Project.findByIdAndUpdate(id, req.body);

    res.redirect(`/projects/${id}`);
};

module.exports.deleteProject = async (req, res) => {

    const { id } = req.params;

    await Project.findByIdAndDelete(id);

    res.redirect("/");
};