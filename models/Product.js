const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  title:{type:String, required:true, unique:true},
  description:{type:String, required:true},
  price: {type:Number, required:true , min:[1,'wrong min price'],max:[10000,'wrong max price']},
  discountPercentage: {type:Number, required:true , min:[1,'wrong discount Percentage'],max:[99,'wrong max discount']},
  rating: {type:Number, required:true , min:[1,'wrong min rating'],max:[5,'wrong max rating'] , default:0},
  stock: {type:Number, required:true , min:[0,'wrong min stock'],default:0},
  brand: {type:String, required:true},
  category: {type:String, required:true},
  thumbnail: {type:String, required:true},
  images:{type:[String], required:true},
  delete:{type:Boolean, required:true,default:false},
}
);

// Define a virtual property 'id' that maps to the '_id' field
productSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are included in the toJSON output
productSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id; // Exclude the '_id' field from the response
  },
  versionKey:false
});

exports.Product = mongoose.model('Product',productSchema)
