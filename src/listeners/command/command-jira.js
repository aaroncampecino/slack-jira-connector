import { logger } from "../../logger";
import { getBugIssues, updateStatus, getBugIssue } from "../../utility";

import service from "../../service";

const jiraCommand = async ({ command, ack, respond, say, payload, client }) => {
  await ack();

  const commandText = command.text;

  const channelId = command.channel_id;

  if (
    //!commandText.startsWith("issues") &&
    !commandText.startsWith("issue") &&
    !commandText.startsWith("update")
  ) {
    await respond(`Invalid command!`);
    return;
  }

  if (commandText === "issues") {
    const response = await service.getJiraIssues();

    await client.chat.postMessage(
      JSON.parse(getBugIssues(channelId, response.data))
    );

    return;
  } else if (commandText.startsWith("issue")) {
    //text format /jira issue JSC-1
    const arrayText = commandText.split(" ");

    if (arrayText.length > 2) {
      respond(`Invalid format, example \`/jira issue IS-1\``);
      return;
    }

    const id = arrayText[1];
    let response = await service.getIssue(id);
    if (response.status !== 200) {
      await respond(`ID ${id} is invalid`);
      return;
    }

    await client.chat.postMessage(
      JSON.parse(getBugIssue(channelId, response.data))
    );

    return;
  }

  if (commandText.startsWith("update")) {
    updateStatus(respond, say, commandText);
    return;
  }
};

module.exports = { jiraCommand };
