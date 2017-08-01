const express = require("express");
const router = express.Router();

router.get("/read", (req, res, next) => {
  res.render("articles/read");
});

router.get("/write", (req, res, next) => {
  res.render("articles/write");
});

module.exports = router;
