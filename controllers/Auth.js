const {User} = require('../models/User');
const bcrypt = require('bcrypt');
const { sanitizedUser } = require('../services/authService');

exports.createUser= async (req, res) => {
  try {
    // Check if the username or email is already taken
    const email = req.body.email
    const existingUser = await User.findOne({ $or: [{ email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: " email is already taken" });
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
          res.status(201).json(sanitizedUser(response));
        }
      });

    });
      
  } 
  catch (err){
     res.status(500).json(err);
  }
};

exports.checkUser = async (req, res) => {
  res.json(req.user)
};

