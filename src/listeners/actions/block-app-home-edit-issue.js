import { logger } from "../../logger";
import { modals } from "../../user-interface";
import service from "../../service";

const appHomeEditIssueCallback = async ({ body, ack, client, action }) => {
  try {
    const id = action.value;

    const response = await service.getIssue(id);

    if (response === "ERR_CONNECTION_REFUSED" || response.status !== 200) {
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

    const transitionsResponse = await service.getTransitions(id);
    // logger.info(JSON.stringify(transitionsResponse.data));
    if (
      transitionsResponse === "ERR_CONNECTION_REFUSED" ||
      transitionsResponse.status !== 200
    ) {
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

    const data = response.data;

    await ack();

    await client.views.open({
      trigger_id: body.trigger_id,
      view: modals.modalEditIssue(
        id,
        data.fields.summary,
        data.fields.description,
        data.fields.status.name,
        data.fields.status.id,
        transitionsResponse.data.transitions
      ),
    });
  } catch (error) {
    logger.error(error);
  }
};

module.exports = { appHomeEditIssueCallback };
