var express = require("express");
var router = express.Router();
const User = require("../models/user");

const { ensureLoggedIn } = require("connect-ensure-login");

/* GET profile page. */
router.get("/profile/:name", ensureLoggedIn("/login"), (req, res, next) => {
  res.render("profile", { name: req.user.name});
});

router.get("/redirect", (req, res, next) => {
  // res.redirect("profile/:name", { name: req.user.name});
  res.redirect("/profile/" + req.user.name);
});

module.exports = router;
