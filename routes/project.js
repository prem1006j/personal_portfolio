const express = require("express");
const router = express.Router();

const Project = require("../models/project");

const { isAdmin } = require("../middleware/auth");
const upload = require("../middleware/upload");


// ===============================
// New Project Form
// Protected
// IMPORTANT: Keep BEFORE /:id
// ===============================

router.get("/new", isAdmin, (req, res) => {

    res.render("portfolio/new");

});




// ===============================
// Create Project
// Protected
// ===============================

router.post(
    "/",
    isAdmin,
    upload.single("image"),
    async (req, res) => {

        const project = new Project({
            projectName: req.body.projectName,
            description: req.body.description,
            technologies: req.body.technologies.split(","),
            githubLink: req.body.githubLink,
            liveLink: req.body.liveLink,
            category: req.body.category,

            image: {
                url: req.file.path,
                filename: req.file.filename
            }
        });

        await project.save();

        res.redirect("/");
    }
);




// ===============================
// Show Single Project
// IMPORTANT: Keep AFTER /new
// ===============================

router.get("/:id", async (req, res) => {


    const { id } = req.params;


    const project = await Project.findById(id);


    res.render(
        "portfolio/show",
        {
            project
        }
    );


});





// ===============================
// Edit Project Form
// Protected
// ===============================

router.get("/:id/edit", isAdmin, async (req, res) => {


    const { id } = req.params;


    const project = await Project.findById(id);


    res.render(
        "portfolio/edit",
        {
            project
        }
    );


});





// ===============================
// Update Project
// Protected
// ===============================

router.put("/:id", isAdmin, async (req, res) => {


    const { id } = req.params;


    await Project.findByIdAndUpdate(
        id,
        req.body
    );


    req.flash(
        "success",
        "Project updated successfully!"
    );


    res.redirect(`/projects/${id}`);


});





// ===============================
// Delete Project
// Protected
// ===============================

router.delete("/:id", isAdmin, async (req, res) => {


    const { id } = req.params;


    await Project.findByIdAndDelete(id);


    req.flash(
        "success",
        "Project deleted successfully!"
    );


    res.redirect("/");


});



module.exports = router;