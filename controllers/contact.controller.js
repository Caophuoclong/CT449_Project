const Contact = require("../models/contact.model");

module.exports = {
    create: async(req, res) => {
        const { name, email, phone, address} = req.body;
        try {
            const contact = new Contact({
                name,
                email,
                phone,
                address,
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
    getById: async (req,res) => {
        const { id } = req.params;
        try{
            const contact = await Contact.findById(id);
        res.json({
            status: "success",
            data: contact,
        })
        }catch(error){
            res.json({
                status: "error",
                message: error.message
            });
        }
    },
    getAll: async(req, res) => {
        const contacts = await Contact.find().sort({ create: -1 });
        res.json({
            status: "success",
            data: contacts
        });
    },

    update: async(req, res) => {
        const { name, email, phone, favorite } = req.body;
        const contact = await Contact.findOneAndUpdate({ phone: req.params.phone }, {
            name,
            email,
            phone,
            favorite
        });
        res.json({
            status: "success",
            data: contact
        });
    },
    favorite: async(req, res) => {
        const { id } = req.params;
        const contact = await Contact.findById(id);
        contact.favorite = !contact.favorite;
        await contact.save();
        if(contact.favorite){
            res.json({
                status: "success",
                message: "Đã thêm liên hệ yêu thích!"
            });
        }else{
            res.json({
                status: "success",
                message: "Đã xóa liên hệ yêu thích!"
            });
        }
    },
    deleteByPhone: async(req, res) => {
        const contact = await Contact.findByIdAndRemove(req.params.phone );
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