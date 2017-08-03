const express = require("express");
const router = express.Router();
const { ensureLoggedIn } = require("connect-ensure-login");

router.get("/read", ensureLoggedIn("/login"), (req, res, next) => {
  res.render("articles/read");
});

router.get("/write", ensureLoggedIn("/login"), (req, res, next) => {
  res.render("articles/write");
});

module.exports = router;
