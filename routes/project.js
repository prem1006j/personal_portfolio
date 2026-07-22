const express = require("express");
const router = express.Router();

const Project = require("../models/project");

const { isAdmin } = require("../middleware/auth");
const { verifyCsrfToken } = require("../middleware/csrf");
const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");
const uploadBufferToCloudinary = require("../utils/cloudinaryUpload");


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
    verifyCsrfToken,
    async (req, res, next) => {

        try {

            const result = await uploadBufferToCloudinary(req.file.buffer);

            const project = new Project({

                projectName: req.body.projectName,

                description: req.body.description,

                technologies: req.body.technologies.split(","),

                githubLink: req.body.githubLink,

                liveLink: req.body.liveLink,

                category: req.body.category,

                image: {

                    url: result.secure_url,

                    filename: result.public_id

                }

            });

            await project.save();

            res.redirect("/");

        } catch (err) {

            next(err);

        }

    }
);



// ===============================
// Show Single Project
// IMPORTANT: Keep AFTER /new
// ===============================

router.get("/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).render("error");
        }

        res.render(
            "portfolio/show",
            {
                project
            }
        );

    } catch (err) {

        // Invalid ObjectId format lands here — show 404 instead of
        // leaking a raw Mongoose CastError message to the client.
        return res.status(404).render("error");

    }

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
    verifyCsrfToken,
    async (req, res, next) => {

        try {

            const { id } = req.params;

            const project = await Project.findById(id);

            if (!project) {
                return res.status(404).render("error");
            }

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

                const result = await uploadBufferToCloudinary(req.file.buffer);

                project.image = {

                    url: result.secure_url,
                    filename: result.public_id

                };

            }

            await project.save();

            req.flash(
                "success",
                "Project updated successfully!"
            );

            res.redirect(`/projects/${id}`);

        } catch (err) {

            next(err);

        }

    }
);



// ===============================
// Delete Project
// Protected
// ===============================

router.delete("/:id", isAdmin, verifyCsrfToken, async (req, res, next) => {

    try {

        const { id } = req.params;

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).render("error");
        }

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

    } catch (err) {

        next(err);

    }

});



module.exports = router;