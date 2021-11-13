const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require("crypto-js");
const verifyToken = require('../routes/verifyToken');

//update 
router.put('/:id', verifyToken, async(req, res)=>{
    if(req.params.id === req.user.id || req.user.isAdmin){
        if(req.body.password){
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.Secret_key).toString();
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
            res.status(200).json(updatedUser);

        }catch(err){
            res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You are not allowed to do that")
    }
})

//delete
router.delete('/find/:id', verifyToken, async(req, res)=>{
    if(req.params.id === req.user.id || req.user.isAdmin){
        await User.findByIdAndDelete(req.params.id)
        res.status(201).json("user has been deleted")
    }else{
        return res.status(403).json("You are not allowed to do that")
    }
})
//get all users
router.get('/', verifyToken, async(req, res)=>{
    const query = req.query.new;
    if(req.user.isAdmin){
        const users = query ? await User.find().sort({_id:-1}).limit(5) : await User.find()
        res.status(200).json(users)
    }else{
        return res.status(403).json("You are not allowed to do that")
    }
})
//get one user
router.get('/:id', verifyToken, async(req, res)=>{
    if(req.params.id === req.user.id || req.user.isAdmin){
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    }else{
        return res.status(403).json("You are not allowed to do that")
    }
})
//get user stats
router.get('/stats', verifyToken, async(req, res)=>{
    if(req.user.isAdmin){
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear()-1));
        try{
            const data = await User.aggregate([
                { $match: { createdAt: { $gte: lastYear } } }, 
                { 
                    $project: {
                        month: { $month: "$createdAt" },
                    },
                },
                {
                    $group: {
                        _id: "$month",
                        total: { $sum: 1 },
                    },
                },
            ])
            res.status(200).json(data);
        }catch(err){
            res.status(500).json(err);
        }
    
    }else{
        return res.status(403).json("you are not allowed to have access")
    }
})
module.exports = router;