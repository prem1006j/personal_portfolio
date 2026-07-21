const express = require("express");
const router = express.Router();

const portfolioController = require("../controllers/portfolio");

router.get("/", portfolioController.index);

router.get("/projects/:id", portfolioController.showProject);

module.exports = router;