const express = require('express');
const mongoose = require('mongoose'); 
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const productsRoute = require('./routes/products');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const stripeRoute = require('./routes/stripe');
const cors = require('cors');
dotenv.config();
const app = express();

app.use(express.json());

//connecting to database
mongoose.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(()=>{
    console.log("database connected");
})
.catch((error)=>{
    console.log(error);
})

app.use(cors())
//routes
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/products', productsRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/api/checkout', stripeRoute);
//port number
app.listen(process.env.PORT || 5000, ()=>{
    console.log("backend-server running");
}) 