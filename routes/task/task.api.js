const route = require("express").Router();
const taskController = require("../../controllers/task.controller");

route.get("/",(req,res)=>{
    res.status(200).send("Welcome to task api");
})

route.post("/create",taskController.createTask);
route.get("/getAll",taskController.getTasks);
route.get("/:id",taskController.getTaskById);
route.put("/update/:id",taskController.updateTask);
route.delete("/delete/:id",taskController.deleteTask);




module.exports = route;