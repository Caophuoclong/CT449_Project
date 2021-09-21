const Schema = require("mongoose").Schema;
const contactSchema = Schema({
  name: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
  },
  phoneNumber: {
    type: "string",
    required: true,
    index: true,
    unique: true,
  },
  address: {
    type: "string",
  },
  time: {
    type: "number",
    default: new Date().getTime(),
  },
});

module.exports = require("mongoose").model("contacts", contactSchema);
