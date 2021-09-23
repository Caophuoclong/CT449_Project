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
    getBy: async(req, res) => {
        const { phone, name } = req.query;
        if (phone) {
            const contact = await Contact.find({ phone });
            res.json({
                status: "success",
                data: contact
            });
        } else if (name) {
            const contact = await Contact.find({ name });
            res.json({
                status: "success",
                data: contact
            });

        };
    },
    getAll: async(req, res) => {},
    update: async(req, res) => {},
    deleteByPhone: async(req, res) => {},
    deleteAll: async(req, res) => {}

}