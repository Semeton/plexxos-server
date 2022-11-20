import express from "express";
// controllers
import user from "../controllers/user.js";

const router = express.Router();

router
  .get("/", user.onGetAllUsers)
  .post("/", user.onCreateUser)
  .post("/check", user.onCheckUserCredentials)
  .get("/:id", user.onGetUserById)
  .get("/me/:email", user.onGetUserByEmail)
  .delete("/:id", user.onDeleteUserById);

export default router;
