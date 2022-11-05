const { Blocks, Message } = require("slack-block-builder");

import { logger } from "../logger";
import service from "../service";

module.exports = async (respond, say, commandText) => {
  //text format /jira update status JSC-1 Backlog
  const arrayText = commandText.split(" ");
  const status = arrayText[1];

  if (
    status === undefined ||
    (status !== "status" && status !== "summary" && status !== "description")
  ) {
    await respond(`You can only update [status, summary, description]`);
    return;
  }

  const id = arrayText[2];
  if (id === undefined) {
    await respond(`Please provide an ID`);
    return;
  }

  //check if id is valid
  let response = await service.getIssue(id);
  if (response.status !== 200) {
    await respond(`ID ${id} is invalid`);
    return;
  }

  arrayText.splice(0, 3);

  const updateStatus = arrayText.join(" ").toString();

  if (status === "status") {
    const transitionsResponse = await service.getTransitions(id);

    let statusId = "";
    transitionsResponse.data.transitions.map((item) => {
      if (item.name === updateStatus) {
        statusId = item.id;
      }
    });

    if (statusId === "") {
      await respond(`Invalid status ${updateStatus}.`);
      return;
    }

    const transitionPayload = {
      transition: {
        id: `${statusId}`,
      },
    };
    response = await service.updateTransitions(id, transitionPayload);
    if (response.status !== 204) {
      await respond(`Error encountered. Please contact admin.`);
      logger.error(response.status);
      logger.error(response.data);
    }
    return;
  }

  if (status === "summary") {
    const payload = {
      update: {
        summary: [
          {
            set: `${updateStatus}`,
          },
        ],
      },
    };

    response = await service.updateIssue(id, payload);
    if (response.status !== 204) {
      await respond(`Error encountered. Please contact admin.`);
      logger.error(response.status);
      logger.error(response.data);
    }
    return;
  }

  if (status === "description") {
    const payload = {
      update: {
        description: [
          {
            set: `${updateStatus}`,
          },
        ],
      },
    };

    response = await service.updateIssue(id, payload);
    if (response.status !== 204) {
      await respond(`Error encountered. Please contact admin.`);
      logger.error(response.status);
      logger.error(response.data);
    }
    return;
  }
};
