import apiCall from "./apiCall";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async fetchAdminList(data) 
  {
    let response = await apiCall("admin/list", data);
    return response;
  },

  async createAdmin(data) 
  {
    let response = await apiCall("admin/add", data);
    return response;
  },
};
