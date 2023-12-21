const express = require('express');
const cors = require('cors')
const main = require('./database') //database import


//routes import
const productRoute = require('./routes/ProductRoutes')
const brandRoute = require('./routes/Brand')
const categoryRoute = require('./routes/Category')
const authRoute = require("./routes/Auth");
const userRoute = require("./routes/User")
const cartRoute = require("./routes/Cart");
const orderRoute = require("./routes/Order");

const server = express()


server.use(cors(
    {exposedHeaders:['X-Total-Count']}
))


server.use(express.json())


server.use('/products',productRoute)
server.use("/brands", brandRoute)
server.use("/categories", categoryRoute)
server.use("/auth", authRoute);
server.use("/users", userRoute);
server.use("/cart", cartRoute);
server.use("/orders", orderRoute);



main().then(()=>{server.listen(8080, console.log("listening to port 8080"));} ).catch(err=>console.log(err))
