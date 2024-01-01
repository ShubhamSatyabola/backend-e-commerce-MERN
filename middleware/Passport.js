const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const {User} = require("../models/User");
const { sanitizedUser, cookieExtractor } = require("../services/authService");

const JwtStrategy = require("passport-jwt").Strategy

var opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET;



passport.use('local',
  new LocalStrategy(
    {usernameField:'email'},
    async function (email, password, done) {
    try {
      const user = await User.findOne({ email: email }).exec();
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
      console.log(err);
      done(err);
    }
  })
);


passport.use('jwt',
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try{
       const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, sanitizedUser(user));
      } else {
        return done(null, false);
        // or you could create a new account
      }
    }
    catch(err){
      console.log(err);
      return done(err, false);
    }
    })
)
  


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
