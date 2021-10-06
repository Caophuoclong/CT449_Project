const jwt = require("jsonwebtoken");
const HandleError = require("./handleError");
module.exports = {
  // middleware to check if user is logged in
  authorization: function (req, res, next) {
    const token = req.headers["authorization"];
    if (token) {
        try{
            const decoded = jwt.verify(token, "2603");
            req.user = decoded;
            next();
        }catch(error){
            if(error.expiredAt){
                next(new HandleError("Token expired",401));
            }
            next(new HandleError(error,401));
        }
    } else {
        next(new HandleError("Unauthorize! Please login", 401));
    }
  },
};

