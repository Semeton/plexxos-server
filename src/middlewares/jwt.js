import jwt from "jsonwebtoken";
// models
import UserModel from "../models/User.js";
import FacilityModel from "../models/Facility.js";

const SECRET_KEY = "XTmGL1WDo6Bi21G52m3VHUK3BUAa2ToLu8Vs7fs=";

export const encode = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const facility = await FacilityModel.getFacilityById(userId);
    const payload = {
      userId: facility._id,
      userType: facility.type,
    };
    const authToken = jwt.sign(payload, SECRET_KEY);
    console.log("Auth", authToken);
    req.authToken = authToken;
    next();
  } catch (error) {
    try {
      const { userId } = req.params;
      const user = await UserModel.getUserById(userId);
      const payload = {
        userId: user._id,
        userType: user.type,
      };
      const authToken = jwt.sign(payload, SECRET_KEY);
      console.log("Auth", authToken);
      req.authToken = authToken;
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
