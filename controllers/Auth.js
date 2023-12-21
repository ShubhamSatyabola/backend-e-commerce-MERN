const {User} = require('../models/User');
const bcrypt = require('bcrypt')

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
      res.status(201).json({id:response.id,email:response.email,name:response.name,role:response.role});
    });
      
  } 
  catch (err){
     res.status(500).json(err);
  }
};

exports.checkUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ $or: [{ email }] });
    //console.log(user)
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ success: true, error: "Something Went Wrong" });
        }
        if (result == true) {
          return res
            .status(200)
            .json({
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
            });
        } else {
          return res.status(401).json({ error: "incorrect password" });
        }
      });
    } else {
      res.status(404).json({ error: "user not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};