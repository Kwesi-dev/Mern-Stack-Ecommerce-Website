const router = require('express').Router();
const Cart = require('../models/Cart');
const verifyToken = require('./verifyToken');

//create
router.post('/', verifyToken, async(req, res)=>{
        const newCart = new Cart(req.body);
        try{
            const savedCart = await newCart.save();
            res.status(200).json(savedCart);
        }catch(err){
            res.status(500).json(err);
        }
    
})
//update
router.put('/:id', verifyToken, async(req, res)=>{
    if(req.user.id === req.params.id || req.user.isAdmin){
        try{
            const updatedCart = await Product.findByIdAndUpdate(req.params.id, {$set:req.body}, {new: true});
            res.status(200).json(updatedCart);
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
            await Cart.findByIdAndRemove(req.params.id);
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
            const carts = await Cart.find();
            res.status(200).json(carts);
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
            const cart = await Cart.findOne({userId: req.params.userId});
            res.status(200).json(cart);
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You are not allowed access");
    }
})
module.exports = router;