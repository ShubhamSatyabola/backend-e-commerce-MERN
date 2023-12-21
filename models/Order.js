const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  totalAmount: { type: Number },
  totalItems: { type: Number },
  userId: { type: String, required: true },
  user: { type: {} },
  address: { type: {}},
  status: { type: String },
  payment: { type: String },
  cartItems: { type: [{}] },
});

// Define a virtual property 'id' that maps to the '_id' field
orderSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are included in the toJSON output
orderSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id; // Exclude the '_id' field from the response
  },
  versionKey: false,
});

exports.Order = mongoose.model("Order", orderSchema);
