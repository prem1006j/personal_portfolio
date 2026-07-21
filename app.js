require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const portfolioRoutes = require("./routes/portfolio");
const projectRoutes = require("./routes/project");
const contactRoutes = require("./routes/contact");
const adminRoutes = require("./routes/admin");


const MONGO_URL = process.env.MONGO_URL;

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.use(
    session({

        secret: process.env.SESSION_SECRET,

        resave:false,

        saveUninitialized:false

    })
);


app.use(flash());


// Flash messages available in all ejs files

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.admin = req.session.admin;
    next();

});



app.use("/", portfolioRoutes);
app.use("/projects", projectRoutes);
app.use("/contact", contactRoutes);
app.use("/admin",adminRoutes);

app.all("/*splat", (req, res) => {

    res.status(404).render("error");

});

app.use((err, req, res, next) => {

    console.log(err);

    let { statusCode = 500, message = "Something went wrong" } = err;


    res.status(statusCode).send(message);

});


main()
    .then(() => {
        console.log("Connected to DB");

        app.listen(8080, () => {
            console.log("Server is listening on port 8080");
        });
    })
    .catch((err) => {
        console.log(err);
    });