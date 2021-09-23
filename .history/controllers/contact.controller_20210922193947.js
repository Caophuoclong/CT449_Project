const Contact = require("../models/contact.model");

module.exports = {
    create: async(req, res) => {
        const { name, email, phone, message } = req.body;
        const contact = new Contact({
            name,
            email,
            phone,
            message
        });
        await contact.save();
        res.json({
            status: "success",
            data: contact
        });
    },
    getBy: async(req, res) => {},
    getAll: async(req, res) => {},
    update: async(req, res) => {},
    deleteByPhone: async(req, res) => {},
    deleteAll: async(req, res) => {}

}