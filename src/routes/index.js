import express from "express";
import user from "../controllers/user.js";
// controllers
import users from "../controllers/user.js";
// middlewares
import { encode } from "../middlewares/jwt.js";

const router = express.Router();

router.get("/", (req, res, next) => {
  res
    .status(200)
    .json({ status: true, message: "Plexxos root server is running" });
});

router.get("/api", (req, res, next) => {
  res
    .status(200)
    .json({ status: true, message: "Plexxos api server is running" });
});

router.post("/api/login", encode, (req, res, next) => {
  const { password, ...others } = req.res.user._doc;
  return res.status(200).json({
    success: true,
    authorization: req.res.authToken,
    user: others,
  });
});

export default router;
//
//
//
