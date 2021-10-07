const env = process.env.NODE_ENV || "development";
require("dotenv").config();
const config = {
  development: {
    app: {
      port: process.env.PORT || 5000,
    },
    db: {
      username: process.env.DB_USERNAME || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "test",
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    },
    jwt: {
      serect: process.env.SERECT_KEY,
    },
    cors: {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: true,
    },
  },
  production: {
    app: {
      port: process.env.PORT || 5000,
    },
    db: {
      username: process.env.DB_USERNAME || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "test",
    },
    jwt: {
      serect: process.env.SERECT_KEY,
    },
    cors: {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: true,
    },
  },
};

module.exports = config[env];
