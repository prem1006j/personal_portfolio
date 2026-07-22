require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const helmet = require("helmet");
const { attachCsrfToken } = require("./middleware/csrf");
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


app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: [
                    "'self'",
                    "https://cdn.jsdelivr.net",
                    "https://unpkg.com"
                ],
                styleSrc: [
                    "'self'",
                    "https://cdn.jsdelivr.net",
                    "https://unpkg.com",
                    "'unsafe-inline'" // bootstrap-icons/AOS inject small style blocks
                ],
                imgSrc: [
                    "'self'",
                    "data:",
                    "https://res.cloudinary.com"
                ],
                fontSrc: ["'self'", "https://cdn.jsdelivr.net", "data:"]
            }
        }
    })
);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.use(
    session({

        secret: process.env.SESSION_SECRET,

        resave:false,

        saveUninitialized:false,

        cookie: {
            httpOnly: true,
            sameSite: "lax",
            // Only send the cookie over HTTPS once deployed behind TLS.
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 2 // 2 hours
        }

    })
);


app.use(flash());
app.use(attachCsrfToken);
// NOTE: verifyCsrfToken is applied per-route (after body-parsing
// middleware), not globally here — multer parses multipart/form-data
// bodies, so a global check here would run before req.body._csrf
// exists on the project create/edit routes.


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

    console.error(err);

    let { statusCode = 500, message = "Something went wrong" } = err;

    // Don't leak internal error details (stack traces, DB error text)
    // to clients once deployed.
    if (statusCode === 500 && process.env.NODE_ENV === "production") {
        message = "Something went wrong";
    }

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