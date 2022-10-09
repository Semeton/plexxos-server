import express from "express";
// controllers
import users from "../controllers/user.js";
// middlewares
import { encode } from "../middlewares/jwt.js";

const router = express.Router();

router.get("/api", (req, res, next) => {
  res.status(200).json({ status: true, message: "Plexxos server is running" });
});

router.post("/login/:userId", encode, (req, res, next) => {});

export default router;
