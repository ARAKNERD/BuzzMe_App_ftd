import apiCall from "./apiCall";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // SCHOOLS

  async fetchAccount(data) {
    let response = await apiCall("account/list", data);
    return response;
  },

  async createAccount(account_code,description) {
    let data = {
        account_code: account_code,
        description: description
    };
    let response = await apiCall("account/add", data);

    return response;
  },

  async updateAccount(account_id,account_code,description) {
    let data = {
        account_id: account_id,
        account_code: account_code,
        description: description
    };
    let response = await apiCall("account/update", data);

    return response;
  },


}