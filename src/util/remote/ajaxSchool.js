import apiCall from "./apiCall";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async fetchSchoolList(data) {
    let response = await apiCall("school/list", data);
    return response;
  },

  // FETCH USER SCHOOL

  async fetchUserSchool(account_id) {
    let data = {
      account_id: account_id,
    };
    let response = await apiCall("user/get_school", data);
    return response;
  },

  async createSchool(data) {
    let response = await apiCall("school/add", data);
    return response;
  },

  async updateSchool(data) {
    let response = await apiCall("school/update", data);
    return response;
  },

  async fetchSchoolNumber(data) {
    let response = await apiCall("school/count", data);
    return response;
  },

  async searchSchoolList(data) {
    let response = await apiCall("school/page", data);
    return response;
  },

  async fetchTodaySchools(data) {
    let response = await apiCall("school/today", data);
    return response;
  },

  async fetchSchools(page) {
    let data = {
      page: page,
    };
    let response = await apiCall("school/page", data);
    return response;
  },

  async turnOnStaffLogin(data) {
    let response = await apiCall("school/staff/on", data);
    return response;
  },

  async turnOffStaffLogin(data) {
    let response = await apiCall("school/staff/off", data);
    return response;
  },

  // SCHOOL USERS

  async fetchSchoolUserList(data) {
    let response = await apiCall("school_user/list", data);
    return response;
  },

  async createSchoolUser(data) {
    let response = await apiCall("school_user/add", data);

    return response;
  },

  async updateSchoolUser(school_user_id, names, username, password, school) {
    let data = {
      school_user_id: school_user_id,
      names: names,
      username: username,
      password: password,
      school: school,
    };
    let response = await apiCall("school_user/update", data);

    return response;
  },

  async schoolUserCount(data) {
    let response = await apiCall("school_user/count", data);
    return response;
  },

  async loginSchoolUser(username, password) {
    let data = {
      username: username,
      password: password,
    };
    let response = await apiCall("school_user/login", data);
    return response;
  },

  async schoolUserPasswordReset(school_user_id, old_password, new_password) {
    let data = {
      school_user_id: school_user_id,
      old_password: old_password,
      new_password: new_password,
    };
    let response = await apiCall("school_user/password/reset", data);
    return response;
  },

  // Contacts

  async fetchStudentContactList(data) {
    let response = await apiCall("contact/list", data);
    return response;
  },

  async createStudentContact(
    contact_number,
    contact_name,
    student_id,
    relationship
  ) {
    let data = {
      contact_number: contact_number,
      contact_name: contact_name,
      student_id: student_id,
      relationship: relationship,
    };
    let response = await apiCall("contact/add", data);

    return response;
  },

  async updateStudentContact(
    contact_id,
    contact_number,
    contact_name,
    student_id,
    relationship
  ) {
    let data = {
      contact_id: contact_id,
      contact_number: contact_number,
      contact_name: contact_name,
      student_id: student_id,
      relationship: relationship,
    };
    let response = await apiCall("contact/update", data);

    return response;
  },

  async fetchSchoolProfile(data) {
    let response = await apiCall("school/profile", data);
    return response;
  },

  async fetchBoothAssistants(data) {
    let response = await apiCall("booth_assistant/list", data);
    return response;
  },

  async createBoothAssistant(data) {
    let response = await apiCall("booth_assistant/add", data);

    return response;
  },
  async turnOnRestrictions(school_id) {
    let data = {
      school_id: school_id,
    };
    let response = await apiCall("school/restrictions/on", data);
    return response;
  },
  async turnOffRestrictions(school_id) {
    let data = {
      school_id: school_id,
    };
    let response = await apiCall("school/restrictions/off", data);
    return response;
  },
  async countSchoolContacts(school) {
    let data = {
      school_id: school
    };
    let response = await apiCall("contact/school/count", data);
    return response;
  },
};
