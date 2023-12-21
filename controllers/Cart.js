const {Cart} = require('../models/Cart')
const mongoose = require('mongoose')
 
exports.addToCart = async (req, res) => {
  try {
    // const{ userId,productId} = req.body // Extract user ID from the request parameters
    

    // Check if the user ID and product ID are valid
    // if (
    //   !mongoose.Types.ObjectId.isValid(userId) ||
    //   !mongoose.Types.ObjectId.isValid(productId)
    // ) {
    //   return res.status(400).json({ error: "Invalid user or product ID" });
    // }

   const cart = new Cart(req.body)
   await cart.save()

    // Send the updated user as a JSON response
    res.status(201).json(cart);
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

exports.getCardById = async (req, res) => {
  try {
    const userId = req.query.user;

    // Check if the user ID is valid
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    // Find cart items by user ID
    const cartItems = await Cart.find({ userId })

    // Check if there are cart items for the user
    if (!cartItems || cartItems.length === 0) {
      return res
        .status(200)
        .json([]);
    }
    // Send the updated user as a JSON response
    res.status(201).json(cartItems);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const {id} = req.params;

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "something went wrong" });
    }
    // Find cart items by  ID
    const cartItems = await Cart.findByIdAndUpdate(id,req.body,{new:true});
    
    // console.log(cartItems);
    
    // Send the updated user as a JSON response
    res.status(201).json(cartItems);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "something went wrong" });
    }
    // Find cart items by  ID
    const cartItems = await Cart.findByIdAndDelete(id);

    // Send the updated user as a JSON response
    res.status(201).json(cartItems);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};