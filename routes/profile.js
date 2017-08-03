var express = require("express");
var router = express.Router();
const { ensureLoggedIn } = require("connect-ensure-login");

/* GET profile page. */
router.get("/", ensureLoggedIn("/login"), (req, res, next) => {
  res.render("profile");
});

module.exports = router;
