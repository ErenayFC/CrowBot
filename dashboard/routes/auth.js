const express = require("express");
const passport = require("passport");
const { generateToken } = require("../utils/jwt");
const router = express.Router();

router.get(
  "/login",
  passport.authenticate("discord", { scope: ["identify", "guilds"] })
);

router.get(
  "/callback",
  passport.authenticate("discord", { failureRedirect: "/" }),
  function (req, res) {
    const token = generateToken(req.user);
    res.cookie("jwt", token, { httpOnly: false });
    res.redirect("/dashboard");
  }
);

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy();
    res.clearCookie("jwt");
    res.redirect("/");
  });
});

module.exports = router;
