const express = require("express");

// controllers
const forum = require("../controllers/forum.js");

const router = express.Router();

router
  .get("/", forum.getRecentConversation)
  .get("/:roomId", forum.getConversationByRoomId)
  .post("/initiate", forum.initiate)
  .post("/:roomId/message", forum.postMessage)
  .put("/:roomId/mark-read", forum.markConversationReadByRoomId);

module.exports = router;
