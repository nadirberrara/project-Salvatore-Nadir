const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/login",
    failureRedirect: "/signup"
  })
);

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

router.post(
  "/login",
  passport.authenticate("local-login", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;
