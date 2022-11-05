import { logger } from "../../logger";
import { getBugIssues, updateStatus } from "../../utility";

import service from "../../service";

const jiraCommand = async ({ command, ack, respond, say, payload, client }) => {
  await ack();

  const commandText = command.text;

  const channelId = command.channel_id;

  if (!commandText.startsWith("issues") && !commandText.startsWith("update")) {
    await respond(`Invalid command!`);
    return;
  }

  if (commandText === "issues") {
    const response = await service.getJiraIssues();

    await client.chat.postMessage(
      JSON.parse(getBugIssues(channelId, response.data))
    );

    return;
  }

  if (commandText.startsWith("update")) {
    updateStatus(respond, say, commandText);
    return;
  }
};

module.exports = { jiraCommand };
