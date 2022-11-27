import { json } from "express";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import FacilityModel from "./Facility.js";

import bcrypt from "bcryptjs";
const SALT_WORK_FACTOR = 10;
// const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ""),
    },
    firstName: String,
    lastName: String,
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: { type: String, trim: true, select: false },
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

userSchema.pre("save", function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

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
    const user = await this.findOne({ email: email });
    if (!user) throw { error: "No user with this email found" };
    return user;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.findByCredentials = async function (email, password) {
  try {
    const user = await this.findOne({ email: email }).populate("password");
    if (!user) throw { error: "No user with this email found" };
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw { error: "Incorrect password" };
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
