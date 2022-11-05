const { Blocks, Message } = require("slack-block-builder");

module.exports = (channelId, data) => {
  return Message({ channel: `${channelId}`, text: "text sample" })
    .blocks(
      Blocks.Section({
        text: `ID: \`${data.key}\`\nSummary: ${data.fields.summary}\nDescription: ${data.fields.description}\nStatus: ${data.fields.status.name}`,
      })
    )
    .buildToJSON();
};
