import jwt from "jsonwebtoken";
// models
import UserModel from "../models/User.js";
import FacilityModel from "../models/Facility.js";

const SECRET_KEY = "XTmGL1WDo6Bi21G52m3VHUK3BUAa2ToLu8Vs7fs=";

export const encode = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const facility = await FacilityModel.findByCredentials(email, password);
    const payload = {
      facilityId: facility._id,
      facilityEmail: facility.email,
    };
    const authToken = jwt.sign(payload, SECRET_KEY);
    console.log("Auth", authToken);
    req.res = { authToken, facility };
    next();
  } catch (error) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findByCredentials(email, password);
      const payload = {
        userId: user._id,
        userEmail: user.email,
      };
      const authToken = jwt.sign(payload, SECRET_KEY);
      console.log("Auth", authToken);
      req.res = { authToken, user };
      next();
      return;
    } catch (error) {
      return res.status(400).json({ success: false, message: error.error });
    }
    // return res.status(400).json({ success: false, message: error.error });
  }
};

export const decode = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res
      .status(400)
      .json({ success: false, message: "No access token provided" });
  }
  const accessToken = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(accessToken, SECRET_KEY);
    req.userId = decoded.userId;
    req.userEmail = decoded.userEmail;
    return next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};
