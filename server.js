const express = require("express");
const http = require("http");
const cors = require("cors");
const config = require("./config");
const mongoose = require("mongoose");
const HandleError = require("./handleError");
const middleware = require("./middleware");

const app = express();
const server = http.createServer(app);
const PORT = config.app.port;
// in this app use mongodb atlas if you use mongodb local 
// please change uri to your localhost
const mongooseUriAtlas = `mongodb+srv://${config.db.username}:${config.db.password}@cluster0.fyage.mongodb.net/${config.db.database}?retryWrites=true&w=majority`
// username look like host, password look like port
const mongooseUriLocal = `mongodb://${config.db.username}:${config.db.password}@localhost:27017/${config.db.database}`
const mongoUrl = process.env.NODE_ENV === "production" ? mongooseUriLocal : mongooseUriAtlas;
mongoose.connect(mongooseUriAtlas, config.db.options).then(() => {
    console.log("MongoDB Connected");
});

app.use(cors(config.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Hello world");
})
app.use("/auth", require("./routes/auth.route"));
app.get("/refreshToken", require("./scripts/refreshToken"))
app.use(middleware.authorization);
app.use("/api", require("./routes/api.route"));
app.use("/user", require("./routes/user.route"));


app.use(function (req, res, next) {
    next(new HandleError("Page not found!", 404));
})
app.use(function (error, req, res, next) {
    res.status(error.statusCode || 500);
    res.json({
        error: {
            message: error.message
        }
    });
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

module.exports = app;