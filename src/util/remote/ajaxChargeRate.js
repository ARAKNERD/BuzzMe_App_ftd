import apiCall from "./apiCall";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // SCHOOLS

  async fetchChargeRateList(data) {
    let response = await apiCall("rate/list", data);
    return response;
  },

  async createChargeRate(rate,type) {
    let data = {
        rate: rate,
        type: type
    };
    let response = await apiCall("rate/add", data);

    return response;
  },

  async updateChargeRate(rate_id,rate,type) {
    let data = {
        rate_id: rate_id,
        rate: rate,
        type: type
    };
    let response = await apiCall("rate/update", data);

    return response;
  },


}