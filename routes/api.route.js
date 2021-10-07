const router = require('express').Router();
const apiController = require('../controllers/api.controller');
const taskRoute = require("./task/task.api")
router.get("/",(req,res)=>{
    return res.json({
        message:"Welcome to the API"
    });
})
router.use("/task",taskRoute)






module.exports = router;