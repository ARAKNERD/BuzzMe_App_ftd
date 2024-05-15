import apiCall from "./apiCall";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async fetchGroupList(school) 
  {
    let data = {
      "school": school
    };
    let response = await apiCall("group/list", data);

    return response;
  },

  async createGroup(group_name,school) 
  {
    let data = {
      group_name: group_name,
      school: school
    };
    let response = await apiCall("group/add", data);

    return response;
  },

  async updateGroup(data) 
  {
    let response = await apiCall("group/update", data);
    return response;
  },
};
