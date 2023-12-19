const { Category } = require("../models/Category");

exports.fetchCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    // console.log(err);
     res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createCategory = async (req, res) => {
  try {
    // console.log(req.body);
    const category = new Category(req.body);
    const response = await category.save();
    res.status(201).json({ response });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

