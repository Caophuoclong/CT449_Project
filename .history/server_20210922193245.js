const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
require('dotenv').config();
const mongoose = require("mongoose");

// hanlde form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// handle static files
app.use(express.static('public'));
// connect mongoose

app.get("/", (req, res) => {
    res.status(200).send("Xin chao");
})

app.use("/contact", require("./routes/contact.route"));



server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})