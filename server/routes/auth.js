const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const passport = require("passport");
const uploadCloud = require('../config/cloundinary');

const login = (req, user) => {
  return new Promise((resolve, reject) => {
    req.login(user, err => {
      if (err) {
        reject(new Error("Something went wrong."));
      } else {
        resolve(user);
      }
    });
  });
};

router.post("/signup", uploadCloud.single('file'), (req, res, next) => {
  
  if(req.file){
    secureurl = req.file.secure_url;
  }

  const { username, password } = req.body;

  if (!username || !password) {
    next(new Error("You must provide valid credentials."));
  }

  User.findOne({ username })
    .then(foundUser => {
      if (foundUser) throw new Error("Username already exists.");

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      return new User({
        username,
        password: hashPass,
        profilePic: secureurl
      }).save();
    })
    .then(savedUser => login(req, savedUser)) // Login the user using passport
    .then(user => res.json({ status: "signup & login successfully", user })) // Answer JSON
    .catch(e => next(e));
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) next(new Error("Something went wrong."));
    if (!theUser) next(failureDetails);

    login(req, theUser).then(user => res.status(200).json(req.user));
  })(req, res, next);
});

router.get("/currentuser", (req, res, next) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    next(new Error("Not logged in."));
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "logged out" });
});

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = router;
