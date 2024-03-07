import apiCall from "./apiCall";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async fetchParentList(data) 
  {
    let response = await apiCall("guardian/list", data);
    return response;
  },
  async updateParent(parent_id,parent_name,username,main_contact,alternative_contact,address,nin) 
  {
    let data = {
      parent_id: parent_id,
      parent_name: parent_name,
      username: username,
      main_contact: main_contact,
      alternative_contact: alternative_contact,
      address: address,
      nin: nin
    };
    let response = await apiCall("guardian/update", data);

    return response;
  },
  async fetchParentRequests(data) 
  {
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


};
