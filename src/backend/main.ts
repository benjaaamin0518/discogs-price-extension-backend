import { app } from "electron";
import startAPI from "./electronServer.js";
app.commandLine.appendSwitch("disable-gpu");
app.commandLine.appendSwitch("disable-gpu-compositing");
app.commandLine.appendSwitch("disable-gpu-rasterization");
app.commandLine.appendSwitch("disable-software-rasterizer");
app.commandLine.appendSwitch("disable-dev-shm-usage");
app.commandLine.appendSwitch("disable-background-networking");
app.commandLine.appendSwitch("disable-background-timer-throttling");
app.commandLine.appendSwitch("disable-renderer-backgrounding");
app.commandLine.appendSwitch("disable-features", "site-per-process");
app.commandLine.appendSwitch("disable-extensions");
app.commandLine.appendSwitch("disable-sync");
app.commandLine.appendSwitch("disable-site-isolation-trials");
app.commandLine.appendSwitch("process-per-site");
app.commandLine.appendSwitch("renderer-process-limit", "1");
app.commandLine.appendSwitch("no-sandbox");

app.whenReady().then(() => {
  startAPI();
});
