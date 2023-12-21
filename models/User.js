const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  addresses: { type: [{}] },
  role: { type: String, required:true , default:'user' },
  name: {type: String},
});

// Define a virtual property 'id' that maps to the '_id' field
userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are included in the toJSON output
userSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id; // Exclude the '_id' field from the response
  },
  versionKey: false,
});

exports.User = mongoose.model("User", userSchema);
