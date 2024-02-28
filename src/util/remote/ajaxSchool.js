import apiCall from "./apiCall";

// eslint-disable-next-line import/no-anonymous-default-export
export default {

  async fetchSchoolList(data) {
    let response = await apiCall("school/list", data);
    return response;
  },

  async createSchool(school_name,contact,email,address,district,region,lat,lng, date_registered,registered_by) {
    let data = {
      school_name: school_name,
      contact: contact,
      email: email,
      address: address,
      district: district,
      region: region,
      lat: lat,
      lng: lng,
      date_registered: date_registered,
      registered_by: registered_by
    };
    let response = await apiCall("school/add", data);

    return response;
  },

  async updateSchool(
    school_id,school_name,contact,email,address,district,region,lat,lng, date_registered,registered_by
  ) {
    let data = {
      school_id: school_id,
      school_name: school_name,
      contact: contact,
      email: email,
      address: address,
      district: district,
      region: region,
      lat: lat,
      lng: lng,
      date_registered: date_registered,
      registered_by: registered_by
    };
    let response = await apiCall("school/update", data);

    return response;
  },

  async schoolCount(data) {
    let response = await apiCall("school/count", data);
    return response;
  },

  async searchSchoolList(query) {
    let data = {
      "query":query
    }
    let response = await apiCall("school/search", data);
    return response;
  },

}