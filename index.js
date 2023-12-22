const express = require('express');
const cors = require('cors')
const main = require('./database') //database import
const session = require("express-session");
const passport = require("passport");

const {isAuth} = require('./services/authService')
//routes import
const productRoute = require('./routes/ProductRoutes')
const brandRoute = require('./routes/Brand')
const categoryRoute = require('./routes/Category')
const authRoute = require("./routes/Auth");
const userRoute = require("./routes/User")
const cartRoute = require("./routes/Cart");
const orderRoute = require("./routes/Order");

const server = express()

// Express middleware for session
server.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));

// Initialize Passport.js and restore authentication state, if any, from the session

server.use(passport.authenticate('session'));

server.use(cors(
    {exposedHeaders:['X-Total-Count']}
))

server.use(express.json())

server.use('/products',isAuth,productRoute)
server.use("/brands", isAuth, brandRoute);
server.use("/categories", isAuth, categoryRoute);
server.use("/auth", authRoute);
server.use("/users", isAuth, userRoute);
server.use("/cart", isAuth, cartRoute);
server.use("/orders", isAuth, orderRoute);




main().then(()=>{server.listen(8080, console.log("listening to port 8080"));} ).catch(err=>console.log(err))
