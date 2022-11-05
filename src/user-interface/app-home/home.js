const {
  HomeTab,
  Header,
  Divider,
  Section,
  Actions,
  Elements,
  Button,
  Blocks,
} = require("slack-block-builder");
const { logger } = require("../../logger");

module.exports = (data) => {
  const homeTab = HomeTab({
    callbackId: "app-home",
    privateMetaData: "in-progress",
  }).blocks(
    Actions({ blockId: "app-home-issues" }).elements(
      Button({ text: "Issues" })
        .value("app-home-issues")
        .actionId("app-home-issues")
        .primary(true),
      Button({ text: "Create Issue" })
        .value("app-home-create-issue")
        .actionId("app-home-create-issue")
    )
  );

  if (data.length === 0) {
    homeTab.blocks(
      Header({
        text: "No JIRA Bug ticket found.",
      })
    );
    return homeTab.buildToJSON();
  }

  const issues = [];

  data.issues?.map((issue) => {
    let actions = Actions({ blockId: `actionId${issue.id}` }).elements(
      Button({
        text: "Edit",
        actionId: "app-home-edit-issue",
        value: `${issue.id}`,
      })
    );

    issues.push(
      Divider(),
      Section({
        text: `ID: \`${issue.key}\`\nSummary: ${issue.fields.summary}\nDescription: ${issue.fields.description}\nStatus: ${issue.fields.status.name}`,
      }),
      actions
    );
  });

  homeTab.blocks(Header({ text: `Bug tickets on Jira` }), issues);

  return homeTab.buildToJSON();
};
