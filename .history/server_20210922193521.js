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
(async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error);
    }
})

app.get("/", (req, res) => {
    res.status(200).send("Xin chao");
})

app.use("/contact", require("./routes/contact.route"));



server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})