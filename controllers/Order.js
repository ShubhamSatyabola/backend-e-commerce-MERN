const { Order } = require("../models/Order");

const mongoose = require('mongoose')

exports.createOrder = async (req,res) => {
    try{
      const newOrder = req.body
      newOrder.userId = req.user.id
        const order = new Order(newOrder)
        await order.save()
        // console.log(order)
        res.status(201).json(order)
    }
    catch(err){
        res.status(500).json("internal server error")
    }
}

exports.fetchUserOrderById = async (req, res) => {
  try {
    const  userId  = req.user.id;
    // console.log(id);
     if (!mongoose.Types.ObjectId.isValid(userId)) {
       return res.status(400).json({ error: "something went wrong" });
     }
const order = await Order.find({userId});
    // console.log(product);
    res.status(200).json(order);
  } catch (err) {
    res.status(401).json(err);
    // console.log(err)
  }
};

exports.fetchAllOrders = async (req, res) => {
  try {
    const {
      _page = 1,
      _limit = 10,
    } = req.query;
    const totalOrders = await Order.countDocuments();
    const orders = await Order.find()
      .skip((_page - 1) * _limit)
      .limit(parseInt(_limit, 10));

    // Send the products as a JSON response
    //   console.log(products);
    // Send the total count as a header
    res.setHeader("X-Total-Count", totalOrders);
    res.status(200).json(orders);
  } catch (err) {
    res.status(401).json(err);
     console.log(err)
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const {orderId} = req.params
    
    const order = await Order.findByIdAndUpdate(orderId,req.body,{new:true})
    // Send the products as a JSON response
   
    res.status(200).json(order);
  } catch (err) {
    res.status(401).json(err);
    // console.log(err)
  }
};