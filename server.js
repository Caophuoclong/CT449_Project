const express = require("express");
const http = require("http");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const HandleError = require("./handleError");
const middleware = require("./middleware");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
const mongooseUri = process.env.MONGODB_URI;
const SERECT_KEY=process.env.SECRET_KEY;
const corsOption = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true

}
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
mongoose.connect(mongooseUri, mongooseOptions).then(() => {
    console.log("MongoDB Connected");
});

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", require("./routes/auth.route"));
app.use(middleware.authorization);
// app.use("/api", require("./routes/api.route"));
// app.use("/user",require("./routes/user.route"));



app.use(function (req,res,next){
    next(new HandleError("Page not found!", 404));
})
app.use(function (error, req, res, next) {
    res.status(error.statusCode || 500);
    console.log(error);
    res.json({
        error: {
            message: error.message
        }
    });
})

server.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})