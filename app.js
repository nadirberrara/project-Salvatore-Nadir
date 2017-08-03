var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const passport = require("passport");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");
//const Article = require("./models/article");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");
const multer = require("multer");

mongoose.connect("mongodb://localhost/pharticles");

var index = require("./routes/index");
var profile = require("./routes/profile");
const auth = require("./routes/auth");
const article = require("./routes/articles");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout", "layouts/main-layout");
app.use(expressLayouts);
app.locals.title = "Pharticles";

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "pharticles",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findOne({ _id: id }, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

// Signing Up
passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true
    },
    (req, email, password, next) => {
      // To avoid race conditions
      process.nextTick(() => {
        User.findOne(
          {
            email: email
          },
          (err, user) => {
            if (err) {
              return next(err);
            }

            if (user) {
              return next(null, false);
            } else {
              // Destructure the body
              const { name } = req.body;
              const hashPass = bcrypt.hashSync(
                password,
                bcrypt.genSaltSync(8),
                null
              );
              const newUser = new User({
                name,
                email,
                password: hashPass
              });

              newUser.save(err => {
                if (err) {
                  next(err);
                }
                return next(null, newUser);
              });
            }
          }
        );
      });
    }
  )
);

// login up
app.use(flash());
passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true
    },
    (req, emailInput, passwordInput, next) => {
      User.findOne({ email: emailInput }, (err, user) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return next(null, false, { message: "Incorrect email" });
        }
        if (!bcrypt.compareSync(passwordInput, user.password)) {
          return next(null, false, { message: "Incorrect password" });
        }

        return next(null, user);
      });
    }
  )
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", index);
app.use("/profile", profile);
app.use("/", auth);
app.use("/", article);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
