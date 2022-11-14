import jwt from "jsonwebtoken";
// models
import UserModel from "../models/User.js";
import FacilityModel from "../models/Facility.js";

const SECRET_KEY = "XTmGL1WDo6Bi21G52m3VHUK3BUAa2ToLu8Vs7fs=";

export const encode = async (req, res, next) => {
  try {
    const { email, password } = req.params;
    const facility = await FacilityModel.getFacilityByEmail(email);
    const payload = {
      facilityEmail: facility.email,
      facilityPassword: facility.password,
      facilityType: facility.type,
    };
    const authToken = jwt.sign(payload, SECRET_KEY);
    if (password === payload.facilityPassword) {
      console.log("Auth", authToken);
      req.authToken = authToken;
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Password mismatch" });
    }
    next();
  } catch (error) {
    try {
      const { email } = req.params;
      const user = await UserModel.getUserByEmail(email);
      const payload = {
        userEmail: user.email,
        userPassword: user.password,
        userType: user.type,
      };
      const authToken = jwt.sign(payload, SECRET_KEY);
      console.log("Auth", authToken);
      if (user == []) {
        return res
          .status(400)
          .json({ success: false, message: "User does not exist" });
      }
      req.res = { authToken, user };
      next();
      return;
    } catch (error) {
      return res.status(400).json({ success: false, message: error.error });
    }
    return res.status(400).json({ success: false, message: error.error });
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
    req.userType = decoded.type;
    return next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

//
