import apiCall from "./apiCall";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async fetchStudentList(school_id, page) 
  {
    let data = {
      "school_id":school_id,
      "page": page
    };
    let response = await apiCall("student/list", data);

    return response;
  },

  async fetchAllStudents(page) 
  {
    let data = {
      "page": page
    };
    let response = await apiCall("student/list", data);

    return response;
  },

  async fetchGroupStudents(group_id, page) 
  {
    let data = {
      "group_id":group_id,
      "page": page
    };
    let response = await apiCall("student/list", data);

    return response;
  },

  async fetchStudentsToday(school) {
    let data = {
      "school":school
    };
    let response = await apiCall("student/today", data);
    return response;
  },
  async fetchAllStudentsToday(data) {
    let response = await apiCall("student/today", data);
    return response;
  },

  async createStudent(data) {
    let response = await apiCall("student/add", data);
    return response;
  },

  async importStudents(data) {
    let response = await apiCall("student/import", data);
    return response;
  },

  async updateStudent(data) {
    let response = await apiCall("student/update", data);

    return response;
  },

  async fetchStudentNumber(school) {
    let data = {
      school_id: school
    };
    let response = await apiCall("student/count", data);
    return response;
  },
  async fetchStudentData(data) {
    let response = await apiCall("student/studentInfo", data);

    return response;
  },
  async fetchStudentContacts(data) {
    let response = await apiCall("contact/list", data);

    return response;
  },
  async fetchStudentCall_logs(data) {
    let response = await apiCall("call_log/list", data);

    return response;
  },
  async searchAllStudents(search) {
    let data = {
      search: search
    };
    let response = await apiCall("student/search", data);
    return response;
  },
  async searchStudent(search, school_id) {
    let data = {
      search: search,
      school_id: school_id
    };
    let response = await apiCall("student/search", data);
    return response;
  },
  async searchGroupStudent(search, group_id) {
    let data = {
      search: search,
      group_id: group_id
    };
    let response = await apiCall("student/search", data);
    return response;
  },
  async fetchStudentCardList(data) {
    let response = await apiCall("student/student_cards", data);
    return response;
  },
  async setDefaultPin(account_id) {
    let data = {
      account_id: account_id
    };
    let response = await apiCall("student/pin/default", data);
    return response;
  },
  async addContact(data) {
    let response = await apiCall("relative/add", data);
    return response;
  },
  async getSchoolStudents(parent, school) {
    let data = {
      parent_id: parent,
      school_id: school,
    };
    let response = await apiCall("link/students/list", data);
    return response;
  },
  async fetchSchoolStudents(school) {
    let data = {
      school_id: school,
    };
    let response = await apiCall("student/search", data);
    return response;
  },
  
};
