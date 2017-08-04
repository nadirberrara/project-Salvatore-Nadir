const express = require("express");
const router = express.Router();
const { ensureLoggedIn } = require("connect-ensure-login");
const multer = require("multer");
const Article = require("../models/article");

router.get("/read", ensureLoggedIn("/login"), (req, res, next) => {
  res.render("articles/read");
});

router.get("/write", ensureLoggedIn("/login"), (req, res, next) => {
  res.render("articles/write");
});

router.get(
  "/read/kebab-bonanza",
  ensureLoggedIn("/login"),
  (req, res, next) => {
    res.render("articles/kebab-bonanza");
  }
);

router.get("/read-dynamic", ensureLoggedIn("/login"), (req, res, next) => {
  res.render("articles/read-dynamic");
});

// Route to upload from project base path
var upload = multer({ dest: "./public/uploads/" });

router.post("/write", upload.single("photo"), function(req, res) {
  const pic = new Article({
    title: req.body.title,
    content: req.body.content,
    picture: `/uploads/${req.file.filename}`,
    _creator: req.user._id
  });

  pic.save(err => {
    res.redirect("/");
  });
});

module.exports = router;
