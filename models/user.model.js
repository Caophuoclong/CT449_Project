const mongoose = require("mongoose");
const { encrypt } = require("../scripts/hashPassword");
require("dotenv").config();
const casual = require("casual");
const SignToken = require("../scripts/endCode");
const Schema = mongoose.Schema;

const schema = new Schema({
  username: {
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
  salt: {
    type: String,
  }
});

const user = mongoose.model("users", schema);
const userFn = {
  signin: async (username, password) => {
    const User = await user.findOne({
      username,
    });
    if (User) {
      const check = encrypt(password, User.salt);
      if (check === User.password) {
        const payload = {id: User._id, username: User.username, email: User.email} 
        return { status: 200, data: {
          token: SignToken(payload)
        }  
      };
      }else {
        return { status: 403, data:{
          message: "Error login!"
        } };
      }
    } else {
      return { status: 403, data:{
        message: "Error login!" 
      }};
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
    
    try{
      await newUser.save();
    return {
      status: 200,
      data: {
        message: "Please return sign in page!"
      }
    }
    }catch(error){
      if(error.code === 11000){
        return {
          status: 403,
          data:{
            message: "User already exists!"
          }
        }
      }
      return { status: 403, data:{
        error 
      }};
    }
  },
  getUser: async (username) => {
    const User = await user.findOne({ username });
    if (User) {
      return { status: 200, data: User };
    } else {
      return { status: 403, error: "User not found!" };
    }
  },
  changePassword: async (data) => {
    const { username, oldPassword, newPassword } = data;
    const User = await user.findOne({ username });
    if (User) {
      const check = encrypt(oldPassword, User.salt);
      if (check === User.password) {
        const salt = casual.uuid;
        const hash = encrypt(newPassword, salt);
        await user.updateOne({ username }, { password: hash, salt });
        return { status: 200, data: {
          message: "Please login again!"
        } };
      } else {
        return { status: 403, message: "Wrong password!" };
      }
    }
  },

  updateUser: async (username, data) => {
    const { password, email, firstname, lastname, phone, dob } = data;
    const userData = await user.findOneAndUpdate(
      { username },
      {
        password,
        email,
        profile: {
          firstname,
          lastname,
          phone,
          dob,
        },
      },
      {
        new: true,
      }
    );
    return { status: 200, data: userData };
  },
};
module.exports = userFn;
