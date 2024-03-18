import apiCall from "./apiCall";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async fetchStationList(school) 
  {
    let data = {
      school_id: school,
    };
    let response = await apiCall("station/list", data);
    return response;
  },

  async fetchFewStations(school,limit) 
  {
    let data = {
      school_id: school,
      limit: limit
    };
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
  async updateStation(data) 
  {
    let response = await apiCall("station/update", data);
    return response;
  },
  async updateHours(data) 
  {
    let response = await apiCall("station/update/hours", data);
    return response;
  },
  
};
