module.exports.isAdmin = (req,res,next)=>{


    if(!req.session.admin){

        req.flash(
            "error",
            "You must login first"
        );


        return res.redirect("/admin/login");

    }


    next();

};