const jwt = require("jsonwebtoken");
const HandleError = require("./handleError");
const config = require("./config");
module.exports = {
  // middleware to check if user is logged in
  authorization: function (req, res, next) {
    const token = req.headers["authorization"];
    if (token) {
        try{
            jwt.verify(token, config.jwt.serect, (err, decoded) => {
                if (err) {
                    next(new HandleError(err,401));
                } else {
                    if(decoded.status !== "refresh"){
                        req.user = decoded;
                        next();
                    }else{
                        next(new HandleError("Your token is invalid!",401))
                    }
                        
                }
            });

        }catch(error){
            if(error.expiredAt){
                res.json({status: 403, message: "Token expired!"});
            }
            next(new HandleError(error,401));
        }
    } else {
        next(new HandleError("Unauthorize! Please login", 401));
    }
  },
};

