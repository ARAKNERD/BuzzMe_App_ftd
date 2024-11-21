import apiCall from "./apiCall";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async fetchStationList(school, page) 
  {
    let data = {
      school_id: school,
      page: page
    };
    let response = await apiCall("station/list", data);
    return response;
  },

  async fetchFewStations(school) 
  {
    let data = {
      school_id: school
    };
    let response = await apiCall("station/few", data);
    return response;
  },

  async createStation(data) 
  {
    let response = await apiCall("station/add", data);
    return response;
  },

  async turnOnStation(data) 
  {
    let response = await apiCall("station/on", data);
    return response;
  },

  async turnOffStation(data) 
  {
    let response = await apiCall("station/off", data);
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
  async searchStation(school, search, page) 
  {
    let data = {
      school_id: school,
      search: search,
      page: page
    };
    let response = await apiCall("station/list", data);
    return response;
  },
  async searchAllStations(search, page) 
  {
    let data = {
      search: search,
      page: page
    };
    let response = await apiCall("station/list", data);
    return response;
  },
  async listAllStations(page) 
  {
    let data = {
      page: page
    };
    let response = await apiCall("station/list", data);
    return response;
  },
  async completeCallByAdmin(call_id) 
  {
    let data = {
      call_id: call_id
    };
    let response = await apiCall("call_log/admin/complete", data);
    return response;
  },
  async fetchStationTimeRanges(station_id) 
  {
    let data = {
      station_id: station_id
    };
    let response = await apiCall("station/timerange/list", data);
    return response;
  },
  async addStationTimeRange(station_id, start_time, end_time) 
  {
    let data = {
      station_id: station_id,
      start_time: start_time,
      end_time:end_time
    };
    let response = await apiCall("station/timerange/add", data);
    return response;
  },
  async updateStationTimeRange(time_id, start_time, end_time) 
  {
    let data = {
      time_id: time_id,
      start_time:start_time,
      end_time:end_time
    };
    let response = await apiCall("station/timerange/update", data);
    return response;
  },
};
