const express = require("express");
// const passport = require('passport')
const passport = require('../middleware/Passport')
const{ createUser, checkUser } = require("../controllers/Auth");
// const passport = require("passport");


const router = express.Router();


router.post("/signup", createUser);

router.post("/login", passport.authenticate('local'), checkUser);

module.exports = router;
