const { Blocks, Message } = require("slack-block-builder");

module.exports = (channelId, data) => {
  const issues = [];

  data.issues?.map((issue) => {
    issues.push(
      Blocks.Divider(),
      Blocks.Section({
        text: `ID: \`${issue.key}\`\nSummary: ${issue.fields.summary}\nDescription: ${issue.fields.description}\nStatus: ${issue.fields.status.name}`,
      })
    );
  });

  return Message({ channel: `${channelId}`, text: "text sample" })
    .blocks(issues)
    .buildToJSON();
};
