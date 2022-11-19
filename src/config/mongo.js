import mongoose from "mongoose";
import config from "./index.js";

const LOCAL_CONNECTION_URL = `mongodb://${config.db.local_url}`;
const LIVE_CONNECTION_URL = `${config.db.live_url}`;

mongoose.connect(LIVE_CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongo has connected succesfully");
});
mongoose.connection.on("reconnected", () => {
  console.log("Mongo has reconnected");
});
mongoose.connection.on("error", (error) => {
  console.log("Mongo connection has an error", error);
  mongoose.disconnect();
});
mongoose.connection.on("disconnected", () => {
  console.log("Mongo connection is disconnected");
});
//
