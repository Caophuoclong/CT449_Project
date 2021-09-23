import Contact, { find, findOneAndUpdate, findOneAndDelete, deleteMany } from "../models/contact.model";

export async function create(req, res) {
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
}
export async function getBy(req, res) {
    const { phone, name } = req.query;
    if (phone) {
        const contact = await find({ phone });
        res.json({
            status: "success",
            data: contact
        });
    } else if (name) {
        const contact = await find({ name });
        res.json({
            status: "success",
            data: contact
        });

    };
}
export async function getAll(req, res) {
    const contacts = await find().sort({ create: -1 });
    res.json({
        status: "success",
        data: contacts
    });
}
export async function update(req, res) {
    const { name, email, phone, message } = req.body;
    const contact = await findOneAndUpdate({ phone: req.params.phone }, {
        name,
        email,
        phone,
        message
    });
    res.json({
        status: "success",
        data: contact
    });
}
export async function deleteByPhone(req, res) {
    const contact = await findOneAndDelete({ phone: req.params.phone });
    res.json({
        status: "success",
        data: contact
    });
}
export async function deleteAll(req, res) {
    try {
        const contact = await deleteMany();
        res.json({
            status: "success",
            data: contact
        });
    } catch (error) {
        console.log(error);
    }


}