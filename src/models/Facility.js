import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

import bcrypt from "bcryptjs";
const SALT_WORK_FACTOR = 10;

export const PLAN_TYPES = {
  BASIC: 1,
  PREMIUM: 2,
};

const facilitySchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ""),
    },
    facilityName: String,
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
    },
    plan: Number,
    password: { type: String, trim: true, select: false },
    type: {
      type: String,
      default: "admin",
    },
    facilityCode: {
      type: String,
      default: "plx-" + crypto.randomBytes(5).toString("hex"),
    },
  },
  {
    timestamps: true,
    collection: "facilities",
  }
);

facilitySchema.pre("save", function (next) {
  var facility = this;

  // only hash the password if it has been modified (or is new)
  if (!facility.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(facility.password, salt, function (err, hash) {
      if (err) return next(err);
      facility.password = hash;
      next();
    });
  });
});

// Create a new facilty object
facilitySchema.statics.createFacility = async function (
  facilityName,
  email,
  password,
  plan
) {
  try {
    const facility = await this.create({ facilityName, email, password, plan });
    return facility;
  } catch (error) {
    throw error;
  }
};

// Get a facilty by id
facilitySchema.statics.getFacilityById = async function (id) {
  try {
    const facility = await this.findOne({ _id: id });
    if (!facility) throw { error: "No facility with this id found" };
    return facility;
  } catch (error) {
    throw error;
  }
};

// Get one facility by email
facilitySchema.statics.getFacilityByEmail = async function (email) {
  try {
    const facility = await this.findOne({ email: email });
    if (!facility) throw { error: "No facility with this email found" };
    return facility;
  } catch (error) {
    throw error;
  }
};

facilitySchema.statics.findByCredentials = async (email, password) => {
  try {
    const facility = await this.findOne({ email: email });
    if (!facility) throw { error: "No facility with this email found" };
    const isMatch = await bcrypt.compare(password, facility.password);
    if (!isMatch) throw { error: "Incorrect password" };
    return facility;
  } catch (error) {
    throw error;
  }
};

// Get all facilities
facilitySchema.statics.getFacilities = async function () {
  try {
    const facilities = await this.find();
    return facilities;
  } catch (error) {
    throw error;
  }
};

// Delete a facility from the database
facilitySchema.statics.deleteByfacilityById = async function (id) {
  try {
    const result = await this.remove({ _id: id });
    return result;
  } catch (error) {
    throw error;
  }
};

export default mongoose.model("Facility", facilitySchema);
