import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

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
    email: String,
    plan: Number,
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

// Create a new facilty object
facilitySchema.statics.createFacility = async function (
  facilityName,
  email,
  plan
) {
  try {
    const facility = await this.create({ facilityName, email, plan });
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
