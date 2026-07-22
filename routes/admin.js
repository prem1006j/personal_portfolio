const express = require("express");
const router = express.Router();

const Admin = require("../models/admin");

const bcrypt = require("bcrypt");

const rateLimit = require("express-rate-limit");
const { verifyCsrfToken } = require("../middleware/csrf");

// Slow down brute-force login attempts: 5 tries per 15 minutes per IP.
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many login attempts. Please try again in 15 minutes."
});



// ===============================
// Login Page
// ===============================

router.get("/login", (req, res) => {

    res.render("admin/login");

});





// ===============================
// Login Logic
// ===============================

router.post("/login", loginLimiter, verifyCsrfToken, async (req, res) => {


    const { username, password } = req.body;



    const admin = await Admin.findOne({
        username: username
    });



    if(!admin){


        req.flash(
            "error",
            "Invalid username or password"
        );


        return res.redirect("/admin/login");

    }



    const validPassword = await bcrypt.compare(
        password,
        admin.password
    );



    if(!validPassword){


        req.flash(
            "error",
            "Invalid username or password"
        );


        return res.redirect("/admin/login");

    }




    req.session.admin = true;



    req.flash(
        "success",
        "Login successful"
    );



    res.redirect("/projects/new");


});





// ===============================
// Logout
// ===============================

router.get("/logout", (req, res) => {


    req.session.destroy(() => {


        res.redirect("/");


    });


});




module.exports = router;