const mongoose = require("mongoose");
const { encrypt } = require("../scripts/hashPassword");
const casual = require("casual");
const Schema = mongoose.Schema;

const schema = new Schema({
  user: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profile: {
    lastname: {
      type: String,
    },
    firstname: {
      type: String,
    },
    phone: {
      type: String,
    },
    dob: {
      type: Date,
    },
  },
});

const user = mongoose.model("users", schema);
const userFn = {
  signin: async (data) => {
    const { username, password } = data;
    const User = await user.findOne({
      username,
    });
    if (User) {
      const check = encrypt(password, User.salt);
      if (check === User.password) {
        return { statusCode: 200, data: User };
      }
    } else {
      return { statusCode: 403, error: "User not found!" };
    }
  },
  signUp: async (data) => {
    const { username, password, email } = data;
    const salt = casual.uuid;
    const hash = encrypt(password, salt);
    const newUser = new user({
      username,
      password: hash,
      email,
      salt,
    });
    await newUser.save();
    return { statusCode: 200, data: { username } };
  },
  getUser: async (data) => {
    const { username } = data;
    const User = await user.findOne({username});
    if (User) {
        return { statusCode: 200, data: User };
    }else{
        return { statusCode: 403, error: "User not found!" };
    }
  },
};
