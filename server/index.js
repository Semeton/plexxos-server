const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const logger = require("morgan");

// mongo connection
require("../config/mongo.js");

// routes
const indexRouter = require("../routes/index.js");
const userRouter = require("../routes/user.js");
const forumRouter = require("../routes/forum.js");
const deleteRouter = require("../routes/delete.js");

// middlewares
const decode = require("../middlewares/jwt.js");

const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/room", decode, forumRouter);
app.use("/delete", deleteRouter);

/** catch 404 and forward to error handler */
app.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "API endpoint doesnt exist",
  });
});

/** Listen on provided port, on all network interfaces. */
const PORT = process.env.PORT || "3100";
app.listen(PORT, (error) => {
  return !error
    ? console.log(`Plexxos server is running on http://localhost:${PORT}/`)
    : console.log("Error occurred, server can't start", error);
});
