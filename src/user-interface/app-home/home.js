const {
  HomeTab,
  Header,
  Divider,
  Section,
  Actions,
  Elements,
  Button,
} = require("slack-block-builder");
const { logger } = require("../../logger");

module.exports = (data) => {
  const homeTab = HomeTab({
    callbackId: "app-home",
    privateMetaData: "in-progress",
  });

  if (data.length === 0) {
    homeTab.blocks(
      Header({
        text: "No result found.",
      })
    );
    return homeTab.buildToJSON();
  }

  const issues = [];

  data.issues?.map((issue) => {
    issues.push(
      Divider(),
      Section({
        text: `ID: \`${issue.key}\`\nDescription: ${issue.fields.summary}`,
      })
    );
  });

  homeTab.blocks(Header({ text: `Bamboo issues on Jira` }), issues);

  return homeTab.buildToJSON();
};
