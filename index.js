require('dotenv').config()
const path = require('path')
const express = require('express');
const cors = require('cors')
const main = require('./database') //database import
const session = require("express-session");
const passport = require("passport");
const cookieParser = require('cookie-parser')
const stripe = require("stripe")(
  process.env.STRIPE_SECRET
);

const Order = require('./models/Order')

const {isAuth} = require('./services/authService')
//routes import
const productRoute = require('./routes/ProductRoutes')
const brandRoute = require('./routes/Brand')
const categoryRoute = require('./routes/Category')
const authRoute = require("./routes/Auth");
const userRoute = require("./routes/User")
const cartRoute = require("./routes/Cart");
const orderRoute = require("./routes/Order");
const { checkAuth } = require('./controllers/Auth');

const server = express()
server.use(express.static(path.resolve(__dirname, "build")));

// stripe webhook
server.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntentSucceeded = event.data.object;
        const order = await Order.findById(
          paymentIntentSucceeded.metadata.orderId
        );
        order.paymentStatus = 'received';
        await order.save();
        // console.log(paymentIntentSucceeded);
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

// Express middleware for session

server.use(
  session({
    secret: process.env.PASSPORT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
server.use(cookieParser());

// Initialize Passport.js and restore authentication state, if any, from the session

server.use(passport.authenticate('session'));

server.use(cors(
    {exposedHeaders:['X-Total-Count']}
))

server.use(express.json())

server.use('/products',isAuth(),productRoute)
server.use("/brands", isAuth(), brandRoute);
server.use("/categories", isAuth(), categoryRoute);
server.use("/auth", authRoute);
server.use("/users", isAuth(), userRoute);
server.use("/cart", isAuth(), cartRoute);
server.use("/orders", isAuth(), orderRoute);
server.use("/bypass", passport.authenticate("jwt"), checkAuth);

//payment
const endpointSecret = process.env.ENDPOINT_SECRET;

server.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // console.log(items);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: items.totalAmount*100,
    currency: "inr",
    description: "Export transaction description",
    shipping: {
      name: items.user.email,
      address: items.address, 
    },
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});


main().then(()=>{server.listen(process.env.PORT, console.log("listening to port 8080"));} ).catch(err=>console.log(err))
