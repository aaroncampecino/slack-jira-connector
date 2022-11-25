const { hiCallback } = require("./sample-message");

module.exports.register = (app) => {
  app.message(hiCallback);
};
