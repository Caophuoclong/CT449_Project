const express = require("express");
const http = require("http");
const cors = require("cors");
const config = require("./config");
const mongoose = require("mongoose");
const HandleError = require("./handleError");
const middleware = require("./middleware");
const { port } = require("./configs/app");
const {mongo_url} = require("./configs/database");
const corsOptions = require("./configs/cors");
const app = express();
const server = http.createServer(app);
// in this app use mongodb atlas if you use mongodb local 
// please change uri to your localhost
mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB Connected");
});

const corsOption = {
    origin: '*',
}
app.use(cors(corsOption));
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

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

module.exports = app;