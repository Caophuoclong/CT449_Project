const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
require('dotenv').config();
const cors = require('cors');
const mongoose = require("mongoose");

// hanlde form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// handle static files
app.use(express.static('public'));
// handle cors
const corsOption = {
    origin: '*',
}
app.use(cors(corsOption));
// connect mongoose
(async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error);
    }
})();

app.get("/", (req, res) => {
    res.status(200).send("Xin chao");
})

app.use("/api/auth", require("./routes/auth.route"));
app.use(require("./middlewares/index.js"));
app.use("/contact", require("./routes/contact.route"));
app.use((req, res, next) => {
    next(new Error("Resource not found"));
})
app.use((err, req, res, next) => {
    res.status(404).json({ message: err.message });
})


server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})