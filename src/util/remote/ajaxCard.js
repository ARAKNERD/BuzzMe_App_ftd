import apiCall from "./apiCall";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async fetchCardList(page) 
  {
    let data = {
      page: page
    };
    let response = await apiCall("card/list", data);
    return response;
  },
  async fetchAssignedCardList(page) 
  {
    let data = {
      page: page,
      status:"1"
    };
    let response = await apiCall("card/list", data);
    return response;
  },
  async fetchInactiveCardList(page) 
  {
    let data = {
      page: page,
      status:"2"
    };
    let response = await apiCall("card/list", data);
    return response;
  },
  async fetchUnassignedCardList(page) 
  {
    let data = {
      page: page,
    };
    let response = await apiCall("card/list/unassigned", data);
    return response;
  },

  async createCard(data) 
  {
    let response = await apiCall("card/add", data);
    return response;
  },

  async turnOnCard(data) 
  {
    let response = await apiCall("card/activate", data);
    return response;
  },

  async turnOffCard(data) 
  {
    let response = await apiCall("card/deactivate", data);
    return response;
  },
  async searchCard(search, page) 
  {
    let data = {
      search: search,
      page: page
    };
    let response = await apiCall("card/list", data);
    return response;
  },
  async searchUnassignedCard(search, page) 
  {
    let data = {
      search: search,
      page: page
    };
    let response = await apiCall("card/list/unassigned", data);
    return response;
  },
  async searchAssignedCard(search, page) 
  {
    let data = {
      search: search,
      page: page,
      status:"1"
    };
    let response = await apiCall("card/list", data);
    return response;
  },
  async searchInactiveCard(search, page) 
  {
    let data = {
      search: search,
      page: page,
      status:"2"
    };
    let response = await apiCall("card/list", data);
    return response;
  },
  async attachCard(data) 
  {
    let response = await apiCall("card/attach", data);
    return response;
  },
  async countAllCards(data) 
  {
    let response = await apiCall("card/count", data);
    return response;
  },
  async countActiveCards(data) 
  {
    let response = await apiCall("card/count/active", data);
    return response;
  },
  async countInactiveCards(data) 
  {
    let response = await apiCall("card/count/inactive", data);
    return response;
  },
  async countUnassignedCards(data) 
  {
    let response = await apiCall("card/count/unassigned", data);
    return response;
  },
  async updateCard(data) 
  {
    let response = await apiCall("card/update", data);
    return response;
  },
  async detachCard(data) 
  {
    let response = await apiCall("card/detach", data);
    return response;
  },
  
};
