const Task = require('../models/task.model');
const HandleError = require('../handleError');

module.exports = {
    createTask: async(req,res,next)=>{
        const {id} = req.user;
        const data = {...req.body, owner: id};
        const response = await Task.create(data);
        if(response.status === 200){
            res.json({
                data: response.message,
            })
        }else{
            next(new HandleError(response.message, response.status));
        }
    },
    getTasks: async(req,res,next)=>{
        const {id} = req.user;
        const response = await Task.getAll(id);
        if(response.status === 200){
            res.json({
                data: response.data?response.data:response.message,
            })
        }else{
            next(new HandleError(response.message, response.status));
        }

    },
    getTaskById: async(req,res,next)=>{
        const data = {id: req.params.id, owner: req.user.id};
        const response = await Task.getOne(data);
        if(response.status === 200){
            res.json({
                data: response.data?response.data:response.message,
            })
        }else{
            next(new HandleError(response.message, response.status));
        }
    },
    updateTask: async(req,res,next)=>{
        const data = {id: req.params.id, owner: req.user.id, ...req.body};
        const response = await Task.update(data);
        if(response.status === 200){
            res.json({
                data: response.data?response.data:response.message,
            })
        }else{
            next(new HandleError(response.message, response.status));
        }

    },
    deleteTask: async(req,res,next)=>{
        const data = {id: req.params.id, owner: req.user.id};
        const response = await Task.delete(data);
        if(response.status === 200){
            res.json({
                data: response.message,
            })
        }
        else{
            next(new HandleError(response.message, response.status));
        }


    }
}