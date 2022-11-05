import express from "express";
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

router.post("/login/:userId", encode, (req, res, next) => {
  return res.status(200).json({
    success: true,
    authorization: req.authToken,
  });
});

export default router;
