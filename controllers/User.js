const {User} = require('../models/User')

exports.fetchUserById = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const user = await User.findById(id);
    // console.log(product);
    res.status(200).json({id:user.id,email:user.email,name:user.name,addresses:user.addresses});
  } catch (err) {
    res.status(401).json(err);
    // console.log(err)
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const user = await User.findByIdAndUpdate(id,req.body,{new:true});
    // console.log(product);
  
    res
      .status(200)
      .json({
        id: user.id,
        email: user.email,
        name: user.name,
        addresses: user.addresses,
      });
  } catch (err) {
    res.status(401).json(err);
    // console.log(err)
  }
};





