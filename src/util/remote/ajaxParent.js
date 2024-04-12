import apiCall from "./apiCall";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async fetchParentList(page) 
  {
    let data = {
      "page": page
    };
    let response = await apiCall("guardian/list", data);
    return response;
  },
  async fetchParentInfo(data) 
  {
    let response = await apiCall("guardian/profile", data);
    return response;
  },
  async updateParent(data) 
  {
    let response = await apiCall("guardian/update", data);
    return response;
  },
  async searchNIN(data) 
  {
    let response = await apiCall("guardian/nin", data);
    return response;
  },
  async createParent(data) 
  {
    let response = await apiCall("guardian/add", data);
    return response;
  },
  async fetchParentRequests(school) 
  {
    let data = {
      school_requested: school
    };
    let response = await apiCall("request/list", data);
    return response;
  },
  async confirmParentRequest(data) 
  {
    let response = await apiCall("request/accept", data);
    return response;
  },
  async declineParentRequest(data) 
  {
    let response = await apiCall("request/deny", data);
    return response;
  },
  async countParents(data) 
  {
    let response = await apiCall("guardian/count", data);
    return response;
  },
  async fetchChildren(data) 
  {
    let response = await apiCall("link/students/all", data);
    return response;
  },
  async addGuardianStudent(data) 
  {
    let response = await apiCall("link/add", data);
    return response;
  },
  async searchGuardian(data) {
    let response = await apiCall("guardian/search", data);
    return response;
  },
  async listParents(data) {
    let response = await apiCall("link/parents/list", data);
    return response;
  },
  async listSchoolParents(school_id, page) {
    let data = {
      "school_id":school_id,
      "page": page
    };
    let response = await apiCall("link/parents/school", data);
    return response;
  },
  async searchSchoolParents(data) {
    let response = await apiCall("link/parents/search", data);
    return response;
  },
  

  
  
};
