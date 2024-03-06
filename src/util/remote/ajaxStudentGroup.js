import apiCall from "./apiCall";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async fetchGroupList(school) {
    let data = {
      school: school,
    };
    let response = await apiCall("group/list", data);

    return response;
  },

  async createGroup(data) {
    let response = await apiCall("group/add", data);

    return response;
  },
};
