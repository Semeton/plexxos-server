import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

export const USER_TYPES = {
  ADMIN: "admin",
  STAFF: "staff",
};

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ""),
    },
    firstName: String,
    lastName: String,
    email: String,
    type: String,
    activationCode: {
      type: String,
      default: "plx-" + crypto.randomBytes(5).toString("hex"),
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

userSchema.statics.createUser = async function (
  firstName,
  lastName,
  email,
  type
) {
  try {
    const user = await this.create({ firstName, lastName, email, type });
    return user;
  } catch (error) {
    throw error;
  }
};

export default mongoose.model("User", userSchema);
