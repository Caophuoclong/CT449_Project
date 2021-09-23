const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

// hanlde form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// handle static files
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.status(200).send("Xin chao");
})

app.use("/contact", require("./routes/contact"));



server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})