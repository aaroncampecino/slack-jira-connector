import { api } from "./api";
import { logger } from "./logger";

class Service {
  async getJiraIssues() {
    return api.get(`search?jql=project=jira-slack-connector`).catch((err) => {
      logger.error(err);
    });
  }

  async createIssue(body) {
    return api.post(`issue`, body).catch((err) => {
      logger.error(err);
    });
  }

  async getIssue(id) {
    return api.get(`issue/${id}`).catch((err) => {
      logger.error(err);
    });
  }

  async updateIssue(id, body) {
    return api.put(`issue/${id}`, body).catch((err) => {
      logger.error(err);
    });
  }

  async getTransitions(id) {
    return api.get(`issue/${id}/transitions`).catch((err) => {
      logger.error(err);
    });
  }

  async updateTransitions(id, body) {
    return api.post(`issue/${id}/transitions`, body).catch((err) => {
      logger.error(err);
    });
  }
}

export default new Service();
