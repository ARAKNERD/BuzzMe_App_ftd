import apiCall from "./apiCall";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
 

  async fetchInvoices(page) {
    let data = {
      page: page
    };
    let response = await apiCall("invoice/list", data);
    return response;
  },

  async searchAllInvoices(page, from, to, search) {
    let data = {
      page: page,
      from: from,
      to: to,
      search: search
    };
    let response = await apiCall("invoice/list", data);
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

  async fetchBuzztimeTransactions(page) {
    let data = {
      page: page,
      account_id: "1"
    };
    let response = await apiCall("wallet/list", data);
    return response;
  },

  async searchBuzztimeTransactions(search, from, to, page) {
    let data = {
      search: search,
      from: from,
      to: to,
      page: page,
      account_id: "1"
    };
    let response = await apiCall("wallet/list", data);
    return response;
  },

  async fetchCallTransactions(page) {
    let data = {
      page: page,
      account_id: "3"
    };
    let response = await apiCall("wallet/list", data);
    return response;
  },

  async searchCallTransactions(search, from, to, page) {
    let data = {
      search: search,
      from: from,
      to: to,
      page: page,
      account_id: "3"
    };
    let response = await apiCall("wallet/list", data);
    return response;
  },

  async fetchMessageTransactions(page) {
    let data = {
      page: page,
      account_id: "2"
    };
    let response = await apiCall("wallet/list", data);
    return response;
  },

  async searchMessageTransactions(search, from, to, page) {
    let data = {
      search: search,
      from: from,
      to: to,
      page: page,
      account_id: "2"
    };
    let response = await apiCall("wallet/list", data);
    return response;
  },
  
  async fetchRecentMMTransactions(data) {
    let response = await apiCall("bank/mm/recent", data);
    return response;
  },
  async fetchBuzzTimeUsed(data) {
    let response = await apiCall("buzz_time/used/today", data);
    return response;
  },
  async fetchBuzzTimeLoaded(data) {
    let response = await apiCall("buzz_time/loaded/today", data);
    return response;
  },
  async fetchUserWalletTransactions(page, user) {
    let data = {
      page: page,
      user_id: user,
      
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
  async fetchAccountActivationInvoices(page) {
    let data = {
      page: page,
      account_id: "4"
    };
    let response = await apiCall("invoice/list", data);
    return response;
  },
  async searchAccountActivationInvoices(searchTerm, startDate, endDate, page) {
    let data = {
      search: searchTerm,
      from: startDate,
      to: endDate,
      page: page,
      account_id: "4"
    };
    let response = await apiCall("invoice/list", data);
    return response;
  },
  async initiateAdminRefund(secure_string, student_user_id, amount, description) {
    let data = {
      secure_string: secure_string,
      student_user_id: student_user_id,
      amount: amount,
      description: description
    };
    let response = await apiCall("mobile/webapp/admin_refund", data);
    return response;
  },
  async fetchBuzzTimeUsedEachMonth(data) {
    let response = await apiCall("buzztime/each_month/report", data);
    return response;
  },
  async fetchAccountActivationsEachMonth(data) {
    let response = await apiCall("account_activations/each_month/report", data);
    return response;
  },


}