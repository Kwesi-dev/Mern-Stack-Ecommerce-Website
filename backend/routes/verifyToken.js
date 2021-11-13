const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next)=>{
    const authHeader = req.headers.token
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err, user)=>{           
            if(err) return res.status(403).json("token is invalid");
            req.user = user;
            next();
        })
    }else{
        return res.status(500).json("user not authenticated");
    }
}

module.exports = verifyToken;