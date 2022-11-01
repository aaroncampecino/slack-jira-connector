const { appHomeIssuesCallback } = require("./block-app-home-issues");
const { appHomeCreateIssueCallback } = require("./block-app-home-create-issue");
const { appHomeEditIssueCallback } = require("./block-app-home-edit-issue");

module.exports.register = (app) => {
  app.action("app-home-issues", appHomeIssuesCallback);
  app.action("app-home-create-issue", appHomeCreateIssueCallback);
  app.action("app-home-edit-issue", appHomeEditIssueCallback);
};
