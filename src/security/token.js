const jwt = require('jsonwebtoken');

module.exports.verifyToken = (req,res,next) => {
    if(req.headers.token){
        jwt.verify(req.headers.token,"secretKey",(err,decoded)=>{
            if(err) {
                res.status(401).send("Invalid token");
            }else{
                req.token = decoded;
                next();
            }
        });
    }else{
        next();
    }
}