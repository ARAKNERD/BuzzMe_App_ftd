import apiCall from "./apiCall";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
 

  async fetchBankTransactions(page) {
    let data = {
      page: page
    };
    let response = await apiCall("bank/list", data);
    return response;
  },
  async fetchAccountTransactions(page,account) {
    let data = {
      page: page,
      account_id: account
    };
    let response = await apiCall("bank/list", data);
    return response;
  },
  async searchBankTransactions(data) {
    let response = await apiCall("bank/list", data);
    return response;
  },
  async fetchRecentTransactions(data) {
    let response = await apiCall("bank/recent", data);
    return response;
  },
  async fetchBuzzTimeUsed(data) {
    let response = await apiCall("buzz_time/used", data);
    return response;
  },
  async fetchBuzzTimeLoaded(data) {
    let response = await apiCall("buzz_time/loaded", data);
    return response;
  },
  async fetchStudentWalletTransactions(student,page) {
    let data = {
      user_id: student,
      page: page
    };
    let response = await apiCall("bank/list", data);
    return response;
  },



}