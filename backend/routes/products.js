const router = require('express').Router();
const Product = require('../models/Product');
const verifyToken = require('./verifyToken');

//create
router.post('/', verifyToken, async(req, res)=>{
    if(req.user.isAdmin){
        const newProduct = new Product(req.body);
        try{
            const savedProduct = await newProduct.save();
            res.status(200).json(savedProduct);
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You are not allowed");
    }
    
})
//update
router.put('/:id', verifyToken, async(req, res)=>{
    if(req.user.isAdmin){
        try{
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {$set:req.body}, {new: true});
            res.status(200).json(updatedProduct);
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You are not allowed");
    }
    
})

//delete
router.delete('/:id', verifyToken, async(req, res)=>{
    if(req.user.isAdmin){
        try{
            await Product.findByIdAndRemove(req.params.id);
            res.status(200).json("product deleted");
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You are not allowed");
    }
    
})

//get all
router.get('/', async(req, res)=>{
    const qNew = req.query.new;
    const qCat = req.query.cat;
    try{
        let products;

        if(qNew){
            products = await Product.find().sort({createdAt: -1}).limit(1); 
        }else if(qCat){
            products = await Product.find({categories: {
                $in: [qCat],
            }})
        }else{
            products = await Product.find();
        }
        res.status(200).json(products);
    }catch(err){
        res.status(500).json(err);
    }
    
})
//get one 
router.get('/find/:id', async(req, res)=>{
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    }catch(err){
        res.status(500).json(err);
    }
    
})
module.exports = router;