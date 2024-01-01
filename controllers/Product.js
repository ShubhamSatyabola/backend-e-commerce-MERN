const {Product} = require('../models/Product')
const mongoose = require('mongoose')

exports.createProduct = async (req,res) => {
 try{ 
        const product = new Product(req.body);
        const response = await product.save();
        // console.log(response);
        res.status(201).json({response})
 }
 catch(err){
    res.status(401).json(err);
    // console.log(err)
}   
}

exports.fetchAllProducts= async (req, res) => {
 
        try {
          const {
            brand,
            category,
            _sort,
            _order,
            _page = 1,
            _limit = 10,
          } = req.query;
          // console.log(req.query);
          
          const filter = {delete:{$ne:true}}
          if (brand) {
            filter.brand = { $in: brand.split(",") };
          }
          if (category) {
            filter.category = { $in: category.split(",") };
          }
          const totalCount = await Product.countDocuments(filter);
          const sortOptions = {};
          if (_sort && _order) {
            sortOptions[_sort] = _order === "desc" ? -1 : 1;
          }
          // Fetch all products from the database
          const products = await Product.find(filter)
            .sort(sortOptions)
            .skip((_page - 1) * _limit)
            .limit(parseInt(_limit, 10));

          // Send the products as a JSON response
          //   console.log(products);
          // Send the total count as a header
          res.setHeader("X-Total-Count", totalCount);
          res.status(200).json(products);
        } catch (error) {
          // Handle errors
          console.error(error);
        }

 
};


exports.fetchProductById= async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const product = await Product.findById(id);
    // console.log(product);
    res.status(200).json(product);
  } catch (err) {
    res.status(401).json(err);
    // console.log(err)
  }  
};

exports.updateProduct= async (req, res) => {
  try {
    const productId = req.params.productId; // Extract product ID from the request parameters

    // Check if the product ID is valid
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid Product ID" });
    }

    // Find the product by ID
    const product = await Product.findById(productId);

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Extract update data from the request body
    const {
      title,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
      thumbnail,
      images } = req.body;
   

    // Update the product fields
    product.title = title || product.title;
    product.description = description || product.description;
    product.price = price || product.price;
    product.discountPercentage = discountPercentage || product.discountPercentage;
    product.rating = rating || product.rating;
    product.stock = stock || product.stock;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.thumbnail = thumbnail || product.thumbnail;
    product.images = images || product.images;

    // Save the updated product to the database
    await product.save();

    // Send the updated product as a JSON response
    res.status(200).json(product);
  } catch (err) {
    res.status(401).json(err);
    console.log(err)
  } 
};

// exports.extra= async (req, res) => {
//   try {
//   } 
//   catch {}
// };

