import { api } from "./api";
import { logger } from "./logger";

class Service {
  async getJiraIssues() {
    return api
      .get(
        `search?jql=project=Bamboo%20AND%20issuetype%3DSuggestion&maxResults=10`,
        {
          // headers: {
          //   Authorization: `Bearer ${process.env.JIRA_TOKEN}`,
          // },
        }
      )
      .catch((err) => {
        logger.error(err);
      });
  }
}

export default new Service();
