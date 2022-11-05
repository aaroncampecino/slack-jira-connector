const eventsListener = require("./events");
const actionListener = require("./actions");
const viewListener = require("./views");
const commandListener = require("./command");

module.exports.registerListeners = (app) => {
  eventsListener.register(app);
  actionListener.register(app);
  viewListener.register(app);
  commandListener.register(app);
};
