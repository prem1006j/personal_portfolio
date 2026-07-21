const express = require("express");
const router = express.Router();

const Admin = require("../models/admin");



// Login Page

router.get("/login",(req,res)=>{

    res.render("admin/login");

});



// Login Logic

router.post("/login", async(req,res)=>{


    const {username,password}=req.body;


    const admin = await Admin.findOne({
        username:username
    });


    if(!admin || admin.password !== password){

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



// Logout

router.get("/logout",(req,res)=>{


    req.session.destroy(()=>{

        res.redirect("/");

    });


});


module.exports = router;