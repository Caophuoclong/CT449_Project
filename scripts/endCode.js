const jwt = require("jsonwebtoken");
require("dotenv").config();
const config = require("../config")
module.exports = {
  SignToken: (user) =>{
    const token = jwt.sign(
        user,
        config.jwt.serect,
        {
          expiresIn: "1h",
        }
    );
    return token;
  },
  SignRefreshToken: (id) =>{
    const token = jwt.sign(
      id,
      config.jwt.serect,
  );
  return token;
  }
}
