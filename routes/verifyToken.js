const jwt = require('jsonwebtoken');

const verifyToken= (req, res, next)=>{
    const authHeader = req.headers.token;
    const token = authHeader.split(" ")[1];
    if(authHeader){
        jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
            if(err) return res.status(500).json(err);
            req.user = user;
            next();
        });
    }else{
        return res.status(401).json("You are not authenticated")
    }
}

const verifyTokenAuthorization = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        console.log(req.user);
        console.log(req.params.id);
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(401).json("Your are not allowed to do that")
        }
    })
}
const verifyTokenAndAdmin = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.user.isAdmin){
            next()
        }else{
            res.status(403).json("Your are not allowed to do that")
        }
    })
}

module.exports = {
    verifyToken, 
    verifyTokenAuthorization,
    verifyTokenAndAdmin
};