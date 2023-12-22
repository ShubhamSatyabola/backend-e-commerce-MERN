const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const {User} = require("../models/User");
const { sanitizedUser } = require("../services/authService");

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await User.findOne({ email: username }).exec();
      if (!user) {
        return done(null, false, { message: "No user found" });
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return done(err);
        }
        if (!result) {
          return done(null, false, { message: "Invalid credentials" });
        }

        return done(null, sanitizedUser(user));
      });
    } catch (err) {
      done(err);
    }
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null,user);
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});




module.exports = passport;
