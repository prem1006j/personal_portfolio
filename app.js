const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

const methodOverride = require("method-override");
const portfolioRoutes = require("./routes/portfolio");
const projectRoutes = require("./routes/project");

const MONGO_URL = "mongodb://127.0.0.1:27017/prem_portfolio";

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", portfolioRoutes);
app.use("/projects", projectRoutes);

// Your project routes...

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