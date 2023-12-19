const express = require('express');
const cors = require('cors')
const main = require('./database') //database import


//routes import
const productRoute = require('./routes/ProductRoutes')
const brandRoute = require('./routes/Brand')
const categoryRoute = require('./routes/Category')


const server = express()


server.use(cors())


server.use(express.json())


server.use('/products',productRoute)
server.use("/brands", brandRoute)
server.use("/categories", categoryRoute)





main().then(()=>{server.listen(8080, console.log("listening to port 8080"));} ).catch(err=>console.log(err))
