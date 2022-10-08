const mongoose = require("mongoose");
import { v4 as uuidv4 } from "uuid";

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
  },
  {
    timestamps: true,
    collection: "users",
  }
);

export default mongoose.model("User", userSchema);
