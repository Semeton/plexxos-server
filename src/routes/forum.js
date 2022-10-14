import express from "express";
// controllers
import forum from "../controllers/forum.js";

const router = express.Router();

router
  .get("/", forum.getRecentConversation)
  .get("/:forum", forum.getConversationByForumId)
  .post("/initiate", forum.initiate)
  .post("/:forumId/message", forum.postMessage)
  .put("/:forumId/mark-read", forum.markConversationReadByForumId);

export default router;
