import apiCall from "./apiCall";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async fetchParentInfo(parent_id) 
  {
    let data = {
      "parent_id":parent_id
    };
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
  async searchTerms(data) 
  {
    let response = await apiCall("guardian/terms", data);
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
  async fetchChildren(parent_id) 
  {
    let data = {
      "parent_id":parent_id
    };
    let response = await apiCall("link/students/all", data);
    return response;
  },
  async addGuardianStudent(data) 
  {
    let response = await apiCall("link/add", data);
    return response;
  },
  async searchGuardian(data) {
    let response = await apiCall("link/parents/school", data);
    return response;
  },
  async listParents(page) {
    let data = {
      "page": page,
    };
    let response = await apiCall("guardian/list", data);
    return response;
  },
  async listRelatives(page) {
    let data = {
      "page": page,
    };
    let response = await apiCall("relative/list", data);
    return response;
  },

  async listStudentParents(data) {
    let response = await apiCall("link/parents/list", data);
    return response;
  },

  async searchAllParents(search, page) {
    let data = {
      "search":search,
      "page": page,
    };
    let response = await apiCall("guardian/list", data);
    return response;
  },
  async searchAllRelatives(data) {
    let response = await apiCall("relative/list", data);
    return response;
  },
  async listSchoolParents(school_id, page) {
    let data = {
      "school_id":school_id,
      "page": page,
    };
    let response = await apiCall("link/parents/school", data);
    return response;
  },
  async searchSchoolParents(search, school_id, page) {
    let data = {
      "search":search,
      "school_id":school_id,
      "page": page,
    };
    let response = await apiCall("link/parents/school", data);
    return response;
  },
  async fetchTodayGuardians(data) {
    let response = await apiCall("guardian/today", data);
    return response;
  },
  async listRelations(data) {
    let response = await apiCall("relationship/list", data);
    return response;
  },
  async countUserContacts(account_id) {
    let data = {
      "account_id":account_id
    };
    let response = await apiCall("contact/user/count", data);
    return response;
  },
  async listParentContacts(user_id) {
    let data = {
      "user_id":user_id
    };
    let response = await apiCall("contact/parent/list", data);
    return response;
  },

  
  
};
