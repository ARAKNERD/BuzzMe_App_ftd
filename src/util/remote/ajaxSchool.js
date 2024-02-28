import apiCall from "./apiCall";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async fetchSchoolList(data) {
    let response = await apiCall("school/list", data);
    return response;
  }
};
