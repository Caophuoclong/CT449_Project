const jwt = require("jsonwebtoken");
require("dotenv").config();
function SignToken(user) {
    const token = jwt.sign(
        user,
        process.env.SERECT_KEY,
        {
          expiresIn: "1h",
        }
    );
    return token;
}
module.exports = SignToken;