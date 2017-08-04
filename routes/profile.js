var express = require("express");
var router = express.Router();
const User = require("../models/user");

const { ensureLoggedIn } = require("connect-ensure-login");

/* GET profile page. */
router.get("/:name", ensureLoggedIn("/login"), (req, res, next) => {
  res.render("profile", { name: req.user.name});
});

router.get("/${<%= user.name %>} ", (req, res, next) => {
  res.render("profile/:name", { name: req.user.name});
});

module.exports = router;
