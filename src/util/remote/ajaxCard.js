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
  async attachCard(data) 
  {
    let response = await apiCall("card/attach", data);
    return response;
  },
  
};
