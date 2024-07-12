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

  async fetchSchoolRateList(data) {
    let response = await apiCall("school_rate/list", data);
    return response;
  },

  async createSchoolRate(data) {
    let response = await apiCall("school_rate/add", data);
    return response;
  },

  async updateSchoolRate(data) {
    let response = await apiCall("school_rate/update", data);
    return response;
  },

  async deleteSchoolRate(data) {
    let response = await apiCall("school_rate/delete", data);
    return response;
  },
  async createChargeType(data) {
    let response = await apiCall("type/add", data);
    return response;
  },
  async fetchChargeTypeList(data) {
    let response = await apiCall("type/list", data);
    return response;
  },


}