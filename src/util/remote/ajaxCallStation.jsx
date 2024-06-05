import apiCall from "./apiCall";
// eslint-disable-next-line import/no-anonymous-default-export

export default {
  async fetchAccount(data) {
    let response = await apiCall("account/list", data);
    return response;
  },

  async CreateCallStation(data) {
    let response = await apiCall("station/add", data);
    return response;
  },
  async callStation_count(school) {
    let data = {
      school_id: school
    };
    let response = await apiCall("station/count", data);
    return response;
  },

  async updateAccount(data) {
    let response = await apiCall("account/update", data);
    return response;
  },
  async listCallLogs(data) {
    let response = await apiCall("call_log/list", data);
    return response;
  },
  async countLogsToday(data) {
    let response = await apiCall("call_log/count/today", data);
    return response;
  },
  async countSchoolLogsToday(school) {
    let data = {
      school_id: school
    };
    let response = await apiCall("call_log/count/today", data);
    return response;
  },
};
