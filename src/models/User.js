import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
// import crypto from "crypto";

// export const USER_TYPES = {
//   ADMIN: "admin",
//   STAFF: "staff",
// };

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ""),
    },
    firstName: String,
    lastName: String,
    email: String,
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
  facilityCode
) {
  try {
    const user = await this.create({
      firstName,
      lastName,
      email,
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
