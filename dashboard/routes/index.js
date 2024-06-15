const express = require("express");
const renderTemplate = require("../utils/renderTemplate");
const config = require("../../config");
const router = express.Router();

router.get("/", function (req, res) {
  renderTemplate(res, req, "index.ejs", {});
});

router.get("/discord", function (req, res) {
  res.redirect(config.supportServerURI);
});

router.get("/commands", function (req, res) {
  renderTemplate(res, req, "commands.ejs", {
    commands: req.client.commandsJSON,
    language: req.userLocale,
  });
});

module.exports = router;
