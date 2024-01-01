const passport = require('passport')
exports.isAuth = (req, res, next) => {
   return passport.authenticate('jwt')
}

exports.sanitizedUser = (user) => {
    return({id:user.id,role:user.role})
}

exports.cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODExYTc3NzBhZTU3NmQ1NTE0OWIyOCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwMzI5NjIyOH0.-uYOJBcjeHAOvJjFUy68UEKP-56cySQ2d9EJ6zjTjTs"
  return token;
};
