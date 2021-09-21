// import package
const express = require("express");
const http = require("http");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
// @ts-ignore
const {BadRequestError} = require("./helpers/error");
// import router
const route = require("./routes/index");
// Declare
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: "*",
};
// config
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
// connect to mongodb
const uri = process.env.ATLAS_URI;
(async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect Database sucessfully!");
  } catch (error) {
    console.log("Connect failed because: " + error);
  }
})();

//
app.use("/api", route.api);

// middleware process error
app.use((req:any,res:any,next:any)=>{
  next(new BadRequestError(300, "resourse not found!"));
});

app.use((err: any,req: any, res: any,next:any)=>{
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
    });
})




server.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
