const express = require("express");
const router = express.Router();

const Contact = require("../models/contact");

const contactSchema = require("../utils/schema");



router.post("/", async(req,res)=>{


    try {


        // Validation

        const { error } = contactSchema.validate(req.body);


        if(error){

            req.flash(
                "error",
                error.details[0].message
            );

            return res.redirect("/");

        }



        // Save Contact Data

        const newContact = new Contact(req.body);


        await newContact.save();



        // Success Message

        req.flash(
            "success",
            "Message sent successfully!"
        );


        res.redirect("/");


    }


    catch(err){


        req.flash(
            "error",
            "Something went wrong"
        );


        res.redirect("/");


    }


});


module.exports = router;