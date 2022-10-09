import express from "express";
// controllers
import forum from "../controllers/forum.js";

const router = express.Router();

router
  .get("/", forum.getRecentConversation)
  .get("/:roomId", forum.getConversationByRoomId)
  .post("/initiate", forum.initiate)
  .post("/:roomId/message", forum.postMessage)
  .put("/:roomId/mark-read", forum.markConversationReadByRoomId);

export default router;
