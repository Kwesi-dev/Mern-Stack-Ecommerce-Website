const router = require('express').Router();
const Order = require('../models/Order');
const verifyToken = require('./verifyToken');

//create
router.post('/', verifyToken, async(req, res)=>{
        const newOrder = new Order(req.body);
        try{
            const savedOrder = await newOrder.save();
            res.status(200).json(savedOrder);
        }catch(err){
            res.status(500).json(err);
        }
    
})
//update
router.put('/:id', verifyToken, async(req, res)=>{
    if(req.user.id === req.params.id || req.user.isAdmin){
        try{
            const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {$set:req.body}, {new: true});
            res.status(200).json(updatedOrder);
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You are not allowed");
    }
    
})

//delete
router.delete('/:id', verifyToken, async(req, res)=>{
    if( req.user.id === req.params.id || req.user.isAdmin){
        try{
            await Order.findByIdAndRemove(req.params.id);
            res.status(200).json("Cart deleted");
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You are not allowed");
    }
    
})

//get all
router.get('/', verifyToken, async(req, res)=>{
    if(req.user.isAdmin){
        try{
            const orders = await Order.find();
            res.status(200).json(orders);
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You are not allowed");
    }
})
//get one 
router.get('/find/:userId', verifyToken, async(req, res)=>{
    if(req.user.id === req.params.userId || req.user.isAdmin){
        try{
            const order = await Order.find({userId: req.params.userId});
            res.status(200).json(order);
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You are not allowed access");
    }
})
//Get monthly income 
router.get('/stats', verifyToken, async(req, res)=>{
    if (req.user.isAdmin){
        const productId = req.query.pid
        const date = new Date();
        const lastMonth = new Date(date.setMonth(date.getMonth()-1));
        const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1))
        try{
            const income = await Order.aggregate([
            {$match : {createdAt: {$gte: prevMonth}, 
                ...(productId && { products: { $elemMatch: { productId } } } )
            }},
            {
                $project:{
                    month:{$month: "$createdAt"},
                    sales: "$amount"
                },
                },
            {
                $group: {
                    _id: "$month",
                    sales: {$sum : "$sales"},
                    },
            },
            ])
            res.status(200).json(income);
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        return res.status(403).json("you are not allowed")
    }
    
})

module.exports = router;

