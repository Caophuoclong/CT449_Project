const Contact = require("../../models/contact.model");

module.exports = {
  create: async function (req: any, res: any) {
    const { name, email, phoneNumber, address } = req.body;
    console.log(req.body);
    try {
      const newContact = new Contact({
        name,
        email,
        phoneNumber,
        address,
      });
      await newContact.save();
      res.json({ message: "Contact created successfully" });
    } catch (error) {
      console.log(error);
      res.json({ message: "failure" });
    }
  },
  read: async function (req: any, res: any) {
    const { phone } = req.params;
    console.log(phone);
    if (phone) {
      const contact = await Contact.find({ phoneNumber: phone });
      console.log(contact);
      if (contact.length === 0) {
        return res.json({ status: 401, message: "Invalid phone" });
      }
      return res.json({ staus: 200, data: contact });
    } else {
      const contact = await Contact.find().sort({ time: 1 });
      return res.json({ staus: 200, data: contact });
    }
  },
  update: function (req: any, res: any) {
    const { phone } = req.params;
    const { name, email, phoneNumber, address } = req.body;
    Contact.findOneAndUpdate(
      { phoneNumber: phone },
      { name, email, phoneNumber, address },
      function (err: any, contact: any) {
        if (err) {
          return res.json({ status: 401, message: "Invalid phone" });
        }
        return res.json({
          status: 200,
          message: "Contact updated successfully",
        });
      }
    );
  },
  remove: async function (req: any, res: any) {
    const { phone } = req.params;
    const contact = await Contact.findOne({ phoneNumber: phone });
    if (contact) {
      console.log(contact);
      await contact.remove();
      return res.json({
        status: 200,
        message: "Contact removed successfully",
      });
    } else {
      return res.json({ status: 401, message: "Invalid phone" });
    }
  },
};
