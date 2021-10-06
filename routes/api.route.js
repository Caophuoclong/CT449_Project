const router = require('express').Router();
const apiController = require('../controllers/api.controller');

router.get("/",(req,res)=>{
    return res.json({
        message:"Welcome to the API"
    });
})






module.exports = router;