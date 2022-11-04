import express from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import logger from "morgan";

// mongo connection
import "../src/config/mongo.js";

// routes
import indexRouter from "../src/routes/index.js";
import userRouter from "../src/routes/user.js";
import facilityRouter from "../src/routes/facility.js";
import forumRouter from "../src/routes/forum.js";
import deleteRouter from "../src/routes/delete.js";

// middlewares
import { decode } from "../src/middlewares/jwt.js";

const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/api/users", userRouter);
app.use("/api/facilities", facilityRouter);
app.use("/api/forum", decode, forumRouter);
app.use("/api/delete", deleteRouter);

/** catch 404 and forward to error handler */
app.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "API endpoint doesn't exist",
  });
});

/** Listen on provided port, on all network interfaces. */
const PORT = process.env.PORT || "3100";
app.listen(PORT, (error) => {
  return !error
    ? console.log(`Plexxos server is running on http://localhost:${PORT}/`)
    : console.log("Error occurred, server can't start", error);
});
