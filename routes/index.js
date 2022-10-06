const express = require("express");
// controllers
const users = require("../controllers/user.js");
// middlewares
const encode = require("../middlewares/jwt.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ status: true, message: "Plexxos server is running" });
});

router.post("/login/:userId", encode, (req, res, next) => {
  //   console.log("hello", req);
});

module.exports = router;
// export default router;
