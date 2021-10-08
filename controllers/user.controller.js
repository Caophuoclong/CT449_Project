const HandleError = require("../handleError");
const userFn = require("../models/user.model");
module.exports = {
    changePassword: async (req, res,next) => {
        const {username} = req.user;
        const {oldPassword, newPassword} = req.body;
        const data = {username, oldPassword, newPassword};
        const response = await userFn.changePassword(data);
        if(response.status === 200){
            res.json({
                message: "Password changed successfully! " + response.message,
            });
        }else{
            next(new HandleError(response.message, response.status));
        }

    },
    updateUser: async (req, res, next) => {
        const {username} = req.user;
        const response = await userFn.updateUser(username, req.body);
        if(response.status === 200){
            res.json({
                message: "User updated successfully!"
            })
        }else{
            next(new HandleError(response.message, response.status));
        }
    },
    getUser: async (req, res) => {
        const {username} = req.user;
        const response = await userFn.getUser(username);
        if(response.status === 200){
            res.json(response.data);
        }else{
            next(new HandleError(response.message, response.status));
        }
    }
}