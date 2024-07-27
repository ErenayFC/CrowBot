const express = require("express");
const renderTemplate = require("../utils/renderTemplate");
const isAuthenticated = require("../middlewares/isAuthenticated");
const ErenayDB = require("erenaydb");
const router = express.Router();

router.get("/", isAuthenticated, async function (req, res) {
  const bots = (await ErenayDB.fetch(`bot_${req.user.id}`)) || [];
  renderTemplate(res, req, "dash.ejs", {
    bots,
  });
});

module.exports = router;
