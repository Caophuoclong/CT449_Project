const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
        index: 1,
        required: true
    },
    address: {
        type: String,

    },
    favorite: {
        type: String,
    },
    time: {
        type: Number,
        default: new Date().getTime(),
    }
});

module.exports = mongoose.model("contacts", contactSchema);