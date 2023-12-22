exports.isAuth = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.send(401);
  }
}

exports.sanitizedUser = (user) => {
    return({id:user.id,role:user.role})
}
