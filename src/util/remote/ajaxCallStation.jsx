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
  async countAllStations(data) {
    let response = await apiCall("station/count", data);
    return response;
  },
  async updateAccount(data) {
    let response = await apiCall("account/update", data);
    return response;
  },
  async listZegoCallLogs(page, type) {
    let data = {
      page: page,
      type: type
    };
    let response = await apiCall("call_log/list", data);
    return response;
  },
  async listTwilioCallLogs(page, type) {
    let data = {
      page: page,
      type: type
    };
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
  async countWeeklyCalls(data) {
    let response = await apiCall("call_log/weekly", data);
    return response;
  },
  async countLogsThisWeek(data) {
    let response = await apiCall("call_log/count/this_week", data);
    return response;
  },
  async countLogsThisMonth(data) {
    let response = await apiCall("call_log/count/this_month", data);
    return response;
  },
  async countStudentLogs(student) {
    let data = {
      student: student
    };
    let response = await apiCall("call_log/count", data);
    return response;
  },
};
