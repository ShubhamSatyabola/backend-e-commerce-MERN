const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  value: { type: String, required: true, unique: true },
  label: { type: String, required: true, unique: true },

  checked: { type: Boolean, required: true, default: false },
});

// Define a virtual property 'id' that maps to the '_id' field
categorySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are included in the toJSON output
categorySchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id; // Exclude the '_id' field from the response
  },
  versionKey: false,
});

exports.Category = mongoose.model("Category", categorySchema);
