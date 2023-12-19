const { Brand } = require("../models/Brand");

exports.fetchBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (err) {
    // console.log(err);
     res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createBrands = async (req, res) => {
  try {
    // console.log(req.body);
    const brand = new Brand(req.body);
    const response = await brand.save();
    res.status(201).json({ response });
    } 
  catch (err) {
    // console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
