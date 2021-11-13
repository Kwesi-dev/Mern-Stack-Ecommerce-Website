const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

//register 
router.post('/register', async(req, res)=>{
     //encrypting password
    const hashedPassword = CryptoJS.AES.encrypt(req.body.password, process.env.Secret_key).toString();
   
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    });
   
    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }catch(err){
        res.status(500).json(err);
    }
})
//login
router.post('/login', async(req, res)=>{
    try{
        const user = await User.findOne({username: req.body.username});
        if(!user) return res.status(401).json("wrong password or username");
        const bytes  = CryptoJS.AES.decrypt(user.password, process.env.Secret_key);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
        if(originalPassword !== req.body.password) return res.status(401).json("wrong password or username");
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, process.env.JWT_SEC, {expiresIn:"3d"});
        const { password, ...others } = user._doc;
        res.status(200).json({...others, accessToken});
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;