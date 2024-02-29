import apiCall from "./apiCall";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
 

  async fetchBankTransactions(data) {
    let response = await apiCall("bank/list", data);
    return response;
  },



}