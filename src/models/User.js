import { json } from "express";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import FacilityModel from "./Facility.js";

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ""),
    },
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    facilityCode: String,
    type: {
      type: String,
      default: "staff",
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

// Create a new user object
userSchema.statics.createUser = async function (
  firstName,
  lastName,
  email,
  password,
  facilityCode
) {
  try {
    const user = await this.create({
      firstName,
      lastName,
      email,
      password,
      facilityCode,
    });
    return user;
  } catch (error) {
    throw error;
  }
};

// Get one user by id
userSchema.statics.getUserById = async function (id) {
  try {
    const user = await this.findOne({ _id: id });
    if (!user) throw { error: "No user with this id found" };
    return user;
  } catch (error) {
    throw error;
  }
};

// Get one user by email
userSchema.statics.getUserByEmail = async function (email) {
  try {
    const user = await this.find({ email: email });
    if (!user) throw { error: "No user with this email found" };
    return user;
  } catch (error) {
    throw error;
  }
};

// Get all users
userSchema.statics.getUsers = async function () {
  try {
    const users = await this.find();
    return users;
  } catch (error) {
    throw error;
  }
};

// Delete a user from the database
userSchema.statics.deleteByUserById = async function (id) {
  try {
    const result = await this.remove({ _id: id });
    return result;
  } catch (error) {
    throw error;
  }
};

export default mongoose.model("User", userSchema);

//hash password in mongoose?
// var mongoose = require("mongoose"),
//   Schema = mongoose.Schema,
//   bcrypt = require("bcrypt"),
//   SALT_WORK_FACTOR = 10;

// var UserSchema = new Schema({
//   username: { type: String, required: true, index: { unique: true } },
//   password: { type: String, required: true },
// });

// UserSchema.pre("save", function (next) {
//   var user = this;

//   // only hash the password if it has been modified (or is new)
//   if (!user.isModified("password")) return next();

//   // generate a salt
//   bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
//     if (err) return next(err);

//     // hash the password using our new salt
//     bcrypt.hash(user.password, salt, function (err, hash) {
//       if (err) return next(err);
//       // override the cleartext password with the hashed one
//       user.password = hash;
//       next();
//     });
//   });
// });

// UserSchema.methods.comparePassword = function (candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
//     if (err) return cb(err);
//     cb(null, isMatch);
//   });
// };

// module.exports = mongoose.model("User", UserSchema);

// var mongoose = require(mongoose),
//   User = require("./user-model");

// var connStr = "mongodb://localhost:27017/mongoose-bcrypt-test";
// mongoose.connect(connStr, function (err) {
//   if (err) throw err;
//   console.log("Successfully connected to MongoDB");
// });

// // create a user a new user
// var testUser = new User({
//   username: "jmar777",
//   password: "Password123",
// });

// // save the user to database
// testUser.save(function (err) {
//   if (err) throw err;
// });

// // fetch the user and test password verification
// User.findOne({ username: "jmar777" }, function (err, user) {
//   if (err) throw err;

//   // test a matching password
//   user.comparePassword("Password123", function (err, isMatch) {
//     if (err) throw err;
//     console.log("Password123:", isMatch); // -&gt; Password123: true
//   });

//   // test a failing password
//   user.comparePassword("123Password", function (err, isMatch) {
//     if (err) throw err;
//     console.log("123Password:", isMatch); // -&gt; 123Password: false
//   });
// });
