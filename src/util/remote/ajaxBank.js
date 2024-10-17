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
  async searchAllTransactions(page, from, to, search) {
    let data = {
      page: page,
      from: from,
      to: to,
      search: search
    };
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
  async fetchBuzzTimeTotal(data) {
    let response = await apiCall("buzz_time/total", data);
    return response;
  },
  async fetchAccountActivationsTotal(data) {
    let response = await apiCall("account_activation/total", data);
    return response;
  },
  async fetchTotalCallCharges(data) {
    let response = await apiCall("call_charges/total", data);
    return response;
  },
  async fetchTotalMessageCharges(data) {
    let response = await apiCall("message_charges/total", data);
    return response;
  },
  async generateMessageReport(data) {
    let response = await apiCall("message/report", data);
    return response;
  },
  async fetchStudentWalletBalance(student) {
    let data = {
      user_id: student
    };
    let response = await apiCall("wallet/balance", data);
    return response;
  },
  async fetchActivationFee(school) {
    let data = {
      school: school
    };
    let response = await apiCall("school_rate/activation/get", data);
    return response;
  },


}