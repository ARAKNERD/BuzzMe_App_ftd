import apiCall from "./apiCall";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async fetchDistrictList(data) 
  {
    let response = await apiCall("district/list", data);
    return response;
  },

  async fetchDistrictListPerRegion(data) 
  {
    let response = await apiCall("district/list/region", data);
    return response;
  },

  async createDistrict(data) 
  {
    let response = await apiCall("district/add", data);
    return response;
  },
};
