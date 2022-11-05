const { jiraCommand } = require("./command-jira");

module.exports.register = (app) => {
  app.command("/jira", jiraCommand);
};
