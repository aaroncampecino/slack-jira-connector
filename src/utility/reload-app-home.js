const { homeView } = require("../user-interface/app-home");

import service from "../service";

import { logger } from "../logger";

module.exports = async (client, slackUserID) => {
  try {

    
    let response = await service.getJiraIssues();
    await client.views.publish({
      user_id: slackUserID,
      view: homeView(response.data),
    });
    return;
  } catch (error) {
    // eslint-disable-next-line no-console
    logger.error(error);
  }
};
