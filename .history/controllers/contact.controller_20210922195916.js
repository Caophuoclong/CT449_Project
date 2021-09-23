const Contact = require("../models/contact.model");

module.exports = {
    create: async(req, res) => {
        const { name, email, phone, message } = req.body;
        try {
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

        } catch (error) {
            res.json({
                status: "error",
                message: error.message
            });

        }
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
    getAll: async(req, res) => {
        const contacts = await Contact.find();
        res.json({
            status: "success",
            data: contacts
        });
    },
    update: async(req, res) => {
        const { name, email, phone, message } = req.body;
        const contact = await Contact.findOneAndUpdate({ phone: req.params.phone }, {
            name,
            email,
            phone,
            message
        });
        res.json({
            status: "success",
            data: contact
        });
    },
    deleteByPhone: async(req, res) => {
        const contact = await Contact.findOneAndDelete({ phone: req.params.phone });
        res.json({
            status: "success",
            data: contact
        });
    },
    deleteAll: async(req, res) => {
        try {
            const contact = await Contact.deleteMany();
            res.json({
                status: "success",
                data: contact
            });
        } catch (error) {
            console.log(error);
        }


    }

}