const HandleError = require("../handleError");
const userFn = require("../models/user.model");
module.exports = {
    changePassword: async (req, res) => {
        const {username} = req.params;
        const {password} = req.body;

    },
    updateUser: async (req, res) => {},
    getUser: async (req, res) => {}
}