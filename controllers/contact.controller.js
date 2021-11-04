const Contact = require("../models/contact.model");
const User = require("../models/user.model");

module.exports = {
    create: async (req, res) => {
        const { name, email, phone, address } = req.body;
        const {id} = req.user;
        try {
            const contact = new Contact({
                name,
                email,
                phone,
                address,
            });
            await contact.save();
            const user = await User.findById(id);
            console.log(user);
            user.contactId.push(contact._id);
            await user.save();
            res.json({
                status: "success",
                data: user,
            });

        } catch (error) {
            res.json({
                status: "error",
                message: error.message
            });

        }
    },
    getBy: async (req, res) => {
        const { phone, name } = req.query;
        console.log(req.query);
        const newRegex = new RegExp(name, "i");
        if (phone) {
            const contact = await Contact.find({ phone });
            res.json({
                status: "success",
                data: contact
            });
        } else if (name) {
            const contact = await Contact.findOne({ name: newRegex });
            res.json({
                status: "success",
                data: contact
            });
        };
    },
    getById: async (req, res) => {
        const { id } = req.params;
        try {
            const contact = await Contact.findById(id);
            res.json({
                status: "success",
                data: contact,
            })
        } catch (error) {
            res.json({
                status: "error",
                message: error.message
            });
        }
    },
    getAll: async (req, res) => {
        // const contacts = await Contact.find().sort({ create: -1 });
        const { id } = req.user;
        const {contactId} = await User.findById(id).populate("contactId");
        res.json({
            status: "success",
            data: contactId,
        });
    },

    update: async (req, res) => {
        const { name, email, phone, favorite, address } = req.body;
        const contact = await Contact.findOneAndUpdate({ phone: req.params.phone }, {
            name,
            email,
            phone,
            favorite, address
        });
        res.json({
            status: "success",
            data: contact
        });
    },
    favorite: async (req, res) => {
        const { id } = req.params;
        const contact = await Contact.findById(id);
        contact.favorite = !contact.favorite;
        await contact.save();
        if (contact.favorite) {
            res.json({
                status: "success",
                message: "Đã thêm liên hệ yêu thích!"
            });
        } else {
            res.json({
                status: "success",
                message: "Đã xóa liên hệ yêu thích!"
            });
        }
    },
    deleteByPhone: async (req, res) => {
        const contact = await Contact.findByIdAndRemove(req.params.phone);
        res.json({
            status: "success",
            data: contact
        });
    },
    deleteAll: async (req, res) => {
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