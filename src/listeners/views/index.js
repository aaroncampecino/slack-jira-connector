const { createIssueCallback } = require("./view-create-issue");
const { editIssueCallback } = require("./view-edit-issue");

module.exports.register = (app) => {
  app.view("view-create-issue", createIssueCallback);
  app.view("view-edit-issue", editIssueCallback);
};
