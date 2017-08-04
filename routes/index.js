var express = require("express");
var router = express.Router();
const Article = require("../models/article");

/* GET home page. */
router.get("/", function(req, res, next) {
  Article.find().then(articles => {
    res.render("index", { articles });
  });
});

module.exports = router;
