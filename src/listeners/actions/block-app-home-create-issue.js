import { logger } from "../../logger";
import { modals } from "../../user-interface";

const appHomeCreateIssueCallback = async ({ body, ack, client }) => {
  try {
    await ack();

    await client.views.open({
      trigger_id: body.trigger_id,
      view: modals.modalCreateIssue(),
    });
  } catch (error) {
    logger.error(error);
  }
};

module.exports = { appHomeCreateIssueCallback };
