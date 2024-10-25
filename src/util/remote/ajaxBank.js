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
  async fetchMMTransactions(page) {
    let data = {
      page: page
    };
    let response = await apiCall("mm/report", data);
    return response;
  },
  async searchMMTransactions(page, from, to, search) {
    let data = {
      page: page,
      from: from,
      to: to,
      search: search
    };
    let response = await apiCall("mm/report", data);
    return response;
  },
  async fetchAccountTransactions(page,account) {
    let data = {
      page: page,
      account_id: account
    };
    let response = await apiCall("wallet/list", data);
    return response;
  },
  async searchBankTransactions(search, from, to, page, account) {
    let data = {
      search: search,
      from: from,
      to: to,
      page: page,
      account_id: account
    };
    let response = await apiCall("wallet/list", data);
    return response;
  },
  async searchAllInvoices(page, from, to, search) {
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
  async fetchUserWalletTransactions(user,page) {
    let data = {
      user_id: user,
      page: page
    };
    let response = await apiCall("wallet/list", data);
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
  async fetchActivationFee(data) {
    let response = await apiCall("school_rate/activation/get", data);
    return response;
  },
  async fetchAccountInvoices(page,account) {
    let data = {
      page: page,
      account_id: account
    };
    let response = await apiCall("bank/list", data);
    return response;
  },
  async searchAccountInvoices(data) {
    let response = await apiCall("bank/list", data);
    return response;
  },


}