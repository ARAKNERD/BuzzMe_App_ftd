import apiCall from "./apiCall";
// eslint-disable-next-line import/no-anonymous-default-export

export default {

  async fetchAccount(data) {
    let response = await apiCall("account/list", data);
    return response;
  },

  async createAccount(data) {
    let response = await apiCall("account/add", data);
    return response;
  },

  async updateAccount(data) {
    let response = await apiCall("account/update", data);
    return response;
  },


}