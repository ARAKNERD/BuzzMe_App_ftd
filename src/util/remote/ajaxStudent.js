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
  async fetchStudentsTodayLimit(school,limit) {
    let data = {
      "school":school,
      "limit":limit
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
  async fetchAllStudentsNumber(data) {
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
  async searchAllStudents(search, page) {
    let data = {
      search: search,
      page: page
    };
    let response = await apiCall("student/list", data);
    return response;
  },
  async searchSchoolStudents(search, school_id, page) {
    let data = {
      search: search,
      school_id: school_id,
      page: page
    };
    let response = await apiCall("student/list", data);
    return response;
  },
  async searchGroupStudent(search, group_id, page) {
    let data = {
      search: search,
      group_id: group_id,
      page: page
    };
    let response = await apiCall("student/list", data);
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
  async countStudentContacts(student) {
    let data = {
      student_id: student,
    };
    let response = await apiCall("contact/student/count", data);
    return response;
  },
  async searchStudentByNumber(number) {
    let data = {
      number: number,
    };
    let response = await apiCall("student/search/code", data);
    return response;
  },
  async transferStudent(student_id, school_to, group_to) {
    let data = {
      student_id: student_id,
      school_to: school_to,
      group_to: group_to
    };
    let response = await apiCall("student/transfer", data);
    return response;
  },
  async listStudentTransfers(student_id) {
    let data = {
      student_id: student_id
    };
    let response = await apiCall("student/list/transfers", data);
    return response;
  },
  async turnOnRestrictions(student_id) {
    let data = {
      "student_id": student_id
    };
    let response = await apiCall("student/restrictions/on", data);
    return response;
  },
  async turnOffRestrictions(student_id) {
    let data = {
      "student_id": student_id
    };
    let response = await apiCall("student/restrictions/off", data);
    return response;
  },
  
};
