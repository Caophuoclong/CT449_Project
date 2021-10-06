const router = require("express").Router();
const authController = require("../controllers/auth.controller");

router.get("/",(req,res)=>{
    res.json({  message: "Welcome to the Auth Route" });
})
router.post("/register",authController.register);
router.post("/login",authController.login);
router.post("/resetpassword",authController.resetPassword);


module.exports = router;