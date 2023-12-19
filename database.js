const mongoose = require("mongoose");



async function main() {
    try{
        await mongoose.connect(
    "mongodb+srv://shubham1998:Shubham%401998@cluster0.0ac70yi.mongodb.net/"
  );
  console.log('db connected');
    }
    catch(err){
        console.log(err);
    }
  


  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

module.exports = main
