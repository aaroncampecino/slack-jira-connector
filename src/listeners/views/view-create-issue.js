import { logger } from "../../logger";
import service from "../../service";
import { modals } from "../../user-interface";
import { reloadAppHome } from "../../utility";

const createIssueCallback = async ({ ack, view, body, client }) => {
  const providedValues = view.state.values;

  const summary = providedValues.summary.summary.value;
  const description = providedValues.description.description.value;

  const payload = {
    fields: {
      summary: `${summary}`,

      issuetype: {
        id: "10004",
      },
      project: {
        id: process.env.JIRA_PROJECT_ID,
      },
      description: `${description}`,
      reporter: {
        id: process.env.JIRA_USER_ID,
      },
    },
  };

  logger.info(`payload ${JSON.stringify(payload)}`);

  const response = await service.createIssue(payload);

  logger.info(`response status ${response.status}`);

  if (response === "ERR_CONNECTION_REFUSED" || response.status !== 201) {
    await ack();
    client.views.open({
      trigger_id: body.trigger_id,
      view: modals.modalInfo(
        "Connector",
        "dummy_call_back",
        "Something went wrong! Please contact the admin.",
        ":alert:"
      ),
    });
    return;
  }

  await ack();
  reloadAppHome(client, body.user.id);
};

module.exports = { createIssueCallback };
