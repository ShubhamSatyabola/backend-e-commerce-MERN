# E- commerce Backend

# Description

This repository contains Backend source code for an E - commerce web app . The backend of web app is created using Node , Express js and MongoDb and moongoose . The code is wriiten using MVC architecture .

# Features
Authentication and authorization using Passport js. \
Payment using Stripe .


# Project folder Structure
`index.js` : It is main file for server setup and handling all the middleware logic.

for All the Logic related to Schema  Locate `models` folder. This folder handle Schema structure . Model folder has . \

`/models/Brand` 
`/models/Cart`
`/models/Category`
`/models/Order`
`/models/Product`
`/models/User`

for Routes Locate `routes` folder. This folder handles all the routes in the application . routes folder has . \

`/routes/Auth`
`/routes/Brand` 
`/routes/Cart`
`/routes/Category`
`/routes/Order`
`/routes/ProductRoutes`
`/routes/User` \

for controller logic Locate `controllers` folder. This folder handles all the logic like sign up , login , placing order, cancelling order  in the application . controller folder . \

`/controllers/Auth`
`/controllers/Brand` 
`/controllers/Cart`
`/controllers/Category`
`/controllers/Order`
`/controllers/Product`
`/controllers/User`



# Project set up
clone Repo using
 ```
git clone https://github.com/ShubhamSatyabola/backend-e-commerce-MERN.git
```
Run npm install to install all dependencies
```
npm install
```
Run npm start to sart the server . Server will start running on [http://localhost:8080]
```
npm start
```

# API Endpoints
## Auth Endpoints : for Sign Up and Login Functionality
### POST : `http://localhost:8080/auth/signup` 
### POST : `http://localhost:8080/auth/login`
## Brands Endpoints : for Creating and fetching brands.
### POST : `http://localhost:8080/brands/` 
### GET : `http://localhost:8080/brands/`
## Categories Endpoints : for Creating and fetching categories of products.
### POST : `http://localhost:8080/categories/` 
### GET : `http://localhost:8080/categories/`
## Products Endpoints : for Creating , fetching all products , fetching any specific product and updating products.
### POST : `http://localhost:8080/products/` 
### GET : `http://localhost:8080/products/`
### GET : `http://localhost:8080/products/:id` id of the product need to e fetched
### PATCH : `http://localhost:8080/products/:id` id of the product need to e updated
## Users Endpoints : for fetching user and updating User Details. 
### GET : `http://localhost:8080/users/`
### PATCH : `http://localhost:8080/users/`
## Cart Endpoints : for adding , fetching , updating and deleting Cart Items. 
### POST : `http://localhost:8080/cart/` 
### GET : `http://localhost:8080/cart/getCart`
### PATCH : `http://localhost:8080/cart/:id` id of the cart Item  need to be updated
### DELETE : `http://localhost:8080/cart/:id` id of the cart Item  need to e deleted
## Orders Endpoints : for Creating , fetching user Order , fetching All orders for admin and updating orders.
### POST : `http://localhost:8080/orders/` 
### GET : `http://localhost:8080/orders/userOrders`
### GET : `http://localhost:8080/orders/admin` 
### PATCH : `http://localhost:8080/orders/admin/:id` id of the order need to e updated



# Contributor
Shubham satyabola



