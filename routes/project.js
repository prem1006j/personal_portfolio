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

        console.log(req.file);

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

        console.log(project);

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

router.put(
    "/:id",
    isAdmin,
    upload.single("image"),
    async (req, res) => {

        const { id } = req.params;

        const project = await Project.findById(id);

        project.projectName = req.body.projectName;
        project.description = req.body.description;
        project.technologies = req.body.technologies.split(",");
        project.githubLink = req.body.githubLink;
        project.liveLink = req.body.liveLink;
        project.category = req.body.category;

        if (req.file) {

            if (project.image.filename) {

                await cloudinary.uploader.destroy(
                    project.image.filename
                );

            }

            project.image = {

                url: req.file.path,
                filename: req.file.filename

            };

        }

        await project.save();

        req.flash(
            "success",
            "Project updated successfully!"
        );

        res.redirect(`/projects/${id}`);

    }
);



// ===============================
// Delete Project
// Protected
// ===============================

router.delete("/:id", isAdmin, async (req, res) => {

    const { id } = req.params;

    const project = await Project.findById(id);

    if (project.image && project.image.filename) {

        await cloudinary.uploader.destroy(
            project.image.filename
        );

    }

    await Project.findByIdAndDelete(id);

    req.flash(
        "success",
        "Project deleted successfully!"
    );

    res.redirect("/");
});



module.exports = router;