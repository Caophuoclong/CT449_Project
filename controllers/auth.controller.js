const HandleError = require("../handleError");
const userFn = require("../models/user.model");
module.exports = {
    login: async (req, res,next) => {
        const {username, password} = req.body;
        const response = await userFn.signin(username, password);
        
        if(response.status === 200){
            res.json(response.data);
        }else{
            next(new HandleError(response.message, response.status));
        }

    },
    register: async (req, res, next) => {
        const {username, password, email} = req.body;
        const response = await userFn.signUp({username, password, email});
        console.log(response);
        if(response.status === 200){
            res.json(response);
        }else{
            next(new HandleError(response.message, response.status));
        }
    },
    resetPassword: async (req, res) => {

    },

}