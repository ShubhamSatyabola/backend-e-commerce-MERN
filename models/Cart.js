const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default:1
  },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: { type: [String], required: true },
  delete: { type: Boolean, required: true, default: false },
  userId: { type: String, required: true },
  productId: { type: String, required: true },
});

// Define a virtual property 'id' that maps to the '_id' field
cartSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are included in the toJSON output
cartSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id; // Exclude the '_id' field from the response
  },
  versionKey: false,
});

exports.Cart = mongoose.model("Cart", cartSchema);
