import apiCall from "./apiCall";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async fetchStationList(data) 
  {
    let response = await apiCall("station/list", data);
    return response;
  },

  async createStation(data) 
  {
    let response = await apiCall("station/add", data);
    return response;
  },

  async activateStation(data) 
  {
    let response = await apiCall("station/activate", data);
    return response;
  },

  async deactivateStation(data) 
  {
    let response = await apiCall("station/deactivate", data);
    return response;
  },
  
};
