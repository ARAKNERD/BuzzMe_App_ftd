import apiCall from "./apiCall";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async fetchStudentList(page, school_id) 
  {
    let data = {
      "page": page,
      "school_id":school_id,
      
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

  async activateUnpaidAccount(user_id) 
  {
    let data = {
      "account_id": user_id
    };
    let response = await apiCall("student/activate", data);

    return response;
  },

  async fetchGroupStudents(page, group_id) 
  {
    let data = {
      "page": page,
      "group_id":group_id,
      
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
  async fetchStudentData(student_id) {
    let data = {
      student_id: student_id
    };
    let response = await apiCall("student/studentInfo", data);

    return response;
  },
  async fetchStudentContacts(student_user_id) {
    let data = {
      student_user_id: student_user_id
    };
    let response = await apiCall("admin/list_student_contacts", data);

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
  async searchSchoolStudents(page, school_id, search) {
    let data = {
      
      page: page,
      school_id: school_id,
      search: search
    };
    let response = await apiCall("student/list", data);
    return response;
  },
  async searchGroupStudent(page, group_id, search) {
    let data = {
      page: page,
      group_id: group_id,
      search: search
      
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
  async getParentStudentsInSameSchool(school_id, parent_user_id, ) {
    let data = {
      school_id: school_id,
      parent_user_id: parent_user_id,
      
    };
    let response = await apiCall("admin/list_parent_students/school", data);
    return response;
  },
  async countStudentContacts(student) {
    let data = {
      student_user_id: student,
    };
    let response = await apiCall("admin/count_student_contacts", data);
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
  async payActivationFee(user_id, phone_number) {
    let data = {
      "user_id": user_id,
      "phone_number": phone_number
    };
    let response = await apiCall("bank/activate/account", data);
    return response;
  },
  async importStudentsandContacts(data) {
    let response = await apiCall("admin/import_students_and_contacts", data);
    return response;
  },
  
};
