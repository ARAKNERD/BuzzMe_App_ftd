import apiCall from "./apiCall";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async loginUser(data) {
    let response = await apiCall("login", data);
    return response;
  },
  async ActivateUserAccount(data) {
    let response = await apiCall("user/password/set", data);
    return response;
  },
  async fetchUserList(data) {
    let response = await apiCall("user/list", data);
    return response;
  },
  async resetUserPassword(data) {
    let response = await apiCall("user/password/reset", data);
    return response;
  },

  async changePassword(data) {
    let response = await apiCall("user/password/change", data);
    return response;
  },

  async getRolePermissionCodes(role_id) {
    let data = {
      role_id: role_id,
    };

    let response = await apiCall("permission/list/role", data);
    return response;
  },
  async fetchUserProfile(data) {
    let response = await apiCall("mobile/webapp/user_info", data);
    return response;
  },
  async fetchSmallRoleList(data) {
    let response = await apiCall("user/roles/two", data);
    return response;
  },
  async remoteLogout(user_id) {
    let data = {
      user_id: user_id,
    };

    let response = await apiCall("user/remote/logout", data);
    return response;
  },
  async deleteUserAccount(account_id) {
    let data = {
      account_id: account_id,
    };

    let response = await apiCall("user/delete", data);
    return response;
  },
  async logoutUser(user_id) {
    let data = {
      user_id: user_id,
    };

    let response = await apiCall("user/remote/logout", data);
    return response;
  },
};
