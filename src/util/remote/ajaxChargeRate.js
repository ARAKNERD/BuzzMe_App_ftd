import apiCall from "./apiCall";

// eslint-disable-next-line import/no-anonymous-default-export
export default {

  async fetchChargeRateList(data) {
    let response = await apiCall("rate/list", data);
    return response;
  },

  async createChargeRate(data) {
    let response = await apiCall("rate/add", data);
    return response;
  },

  async updateChargeRate(data) {
    let response = await apiCall("rate/update", data);
    return response;
  },


}