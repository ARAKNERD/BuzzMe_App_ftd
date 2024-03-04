import apiCall from "./apiCall";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async fetchRegionList(data) 
  {
    let response = await apiCall("region/list", data);
    return response;
  },

  async createRegion(data) 
  {
    let response = await apiCall("region/add", data);
    return response;
  },
};
