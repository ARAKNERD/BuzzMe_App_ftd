import apiCall from "./apiCall";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async fetchStudentList(data) {
    let response = await apiCall("student/list", data);
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
      school: school,
    };
    let response = await apiCall("student/list", data);

    return response;
  },
};
