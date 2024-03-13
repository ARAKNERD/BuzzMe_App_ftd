import apiCall from "./apiCall";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async fetchStudentList(data) {
    let response = await apiCall("student/list", data);
    return response;
  },

  async fetchStudentsToday(data) {
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

  async fetchStudentNumber(data) {
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
  async searchStudent(data) {
    let response = await apiCall("student/search", data);
    return response;
  },
};
