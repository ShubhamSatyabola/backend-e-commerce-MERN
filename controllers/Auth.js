const {User} = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { sanitizedUser } = require('../services/authService');

exports.createUser= async (req, res) => {
  try {
    // Check if the username or email is already taken
    const email = req.body.email
    const existingUser = await User.findOne({ $or: [{ email }] });
    if (existingUser) {
      return res
        .status(400)
        .json( " email is already taken" );
    }
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
    //   console.log(err);
      const user = new User(req.body);
      user.password = hash;
      const response = await user.save();
      
      req.login(sanitizedUser(response), (err) => {
        if (err) {
          return res.status(400).json(err);
        } else {
          const token = jwt.sign(
            sanitizedUser(response),
            process.env.JWT_SECRET
          );
          res.cookie("jwt", token, { httpOnly: true, expires:new Date(Date.now()+ 3600000) }).status(201).json(token);
        }
      });
    });
      
  } 
  catch (err){
     res.status(500).json(err);
  }
};

exports.checkUser = async (req, res) => {
  try {
    const token = jwt.sign(req.user, process.env.JWT_SECRET);
    res
      .cookie("jwt", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 3600000),
      })
      .status(201)
      .json(token);
  } catch (err) {
    console.log((err));
    res.status(500).json('something went wrong');
  }

};
exports.checkAuth = async (req, res) => {
  if (req.user) {
    const token = jwt.sign(req.user, process.env.JWT_SECRET);
    res.json(token);
  } else {
    res.sendStatus(401);
  }
};

