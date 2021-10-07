const config = require('../config');
const jwt = require('jsonwebtoken');
const userFn = require("../models/user.model");
const HandleError = require('../handleError');
module.exports = (req,res,next)=>{
    const token = req.headers["authorization"];
    if(token){
        jwt.verify(token,config.jwt.serect, async (err,decoded)=>{
            if(err){
                next(new HandleError(err,401));
            }else{
                const {id} = decoded;
                const response = await userFn.getUserById(id);
                if(response.status === 200){
                    res.json({token: response.token});
                }else{
                    next(new HandleError(response.message,response.status));
                }
            }
        })
    }else{
        next(new HandleError("Login again!", 401));
    }
}