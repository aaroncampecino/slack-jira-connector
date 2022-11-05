const { App, LogLevel } = require("@slack/bolt");
import "dotenv/config";
import { registerListeners } from "./listeners";
import { logger } from "./logger";

let logLevel;
switch (process.env.LOG_LEVEL) {
  case "debug":
    logLevel = LogLevel.DEBUG;
    break;
  case "info":
    logLevel = LogLevel.INFO;
    break;
  case "warn":
    logLevel = LogLevel.WARN;
    break;
  case "error":
    logLevel = LogLevel.ERROR;
    break;
  default:
    logLevel = LogLevel.INFO;
}

const app = new App({
  signingSecret: process.env.SLACK_BOT_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  // appToken: process.env.SLACK_APP_TOKEN,
  // socketMode: process.env.SLACK_SOCKET_MODE === "true",
  logLevel: logLevel,
  customRoutes: [
    {
      path: "/health-check",
      method: ["GET"],
      handler: (req, res) => {
        res.writeHead(200);
        res.end("UP!");
      },
    },
  ],
});

registerListeners(app);

app.command("/echo", async ({ command, ack, respond }) => {
  // Acknowledge command request
  await ack();

  await respond(`${command.text}`);
});

(async () => {
  // Start the app
  await app.start(process.env.PORT);
  logger.info(`⚡️ Bolt apps is running on port ${process.env.PORT}!`);
})();
