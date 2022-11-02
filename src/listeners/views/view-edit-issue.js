import { logger } from "../../logger";
import service from "../../service";
import { modals } from "../../user-interface";
import { reloadAppHome } from "../../utility";

const editIssueCallback = async ({ ack, view, body, client }) => {
  await ack();
  const providedValues = view.state.values;
  const id = view.private_metadata;

  const summary = providedValues.summary.summary.value;
  const description = providedValues.description.description.value;
  const statusId = providedValues.status.status.selected_option.value;

  logger.info(`id ${id}`);
  logger.info(`summary ${summary}`);
  logger.info(`description ${description}`);
  logger.info(`statusId ${statusId}`);

  const payload = {
    update: {
      summary: [
        {
          set: `${summary}`,
        },
      ],
      description: [
        {
          set: `${description}`,
        },
      ],
    },
  };

  const transitionPayload = {
    transition: {
      id: `${statusId}`,
    },
  };

  const responseStatus = await service.updateIssue(id, payload);

  const response = await service.updateTransitions(id, transitionPayload);

  if (
    response === "ERR_CONNECTION_REFUSED" ||
    response.status !== 204 ||
    responseStatus === "ERR_CONNECTION_REFUSED" ||
    responseStatus.status !== 204
  ) {
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

  reloadAppHome(client, body.user.id);
};

module.exports = { editIssueCallback };
