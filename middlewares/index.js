const jwt = require('jsonwebtoken');
module.exports = function(req,res,next){
    const {authorization} = req.headers;
    if(authorization){
        const token = authorization;
        jwt.verify(token,'phuoclong',(err,decoded)=>{
            if(err){
                return res.status(401).json({
                    message: 'Invalid Token'
                })
            }
            req.user = decoded;
            next();
        })
    }else{
        res.status(401).json({
            message: 'Unauthorized'
        })
    }
}