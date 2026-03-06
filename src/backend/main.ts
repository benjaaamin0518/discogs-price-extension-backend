import { app } from "electron";
import startAPI from "./electronServer.js";

app.whenReady().then(() => {
  startAPI();
});
