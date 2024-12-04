import React, { useEffect, useState } from 'react';
import ajaxStudent from '../util/remote/ajaxStudent';
import ajaxCallStation from '../util/remote/ajaxCallStation';
import ajaxBank from '../util/remote/ajaxBank';

const StudentContext = React.createContext();

export const StudentConsumer = StudentContext.Consumer;

export const StudentProvider = (props)=> {

  const [studentList, setStudentList] = useState([]);
  const [schoolStudentList, setSchoolStudentList] = useState([]);

  const [studentsToday, setStudentsToday] = useState([]);
  const [schoolStudentsToday, setSchoolStudentsToday] = useState([]);

  const [studentId, setStudentId] = useState(null);
  const [studentUserId, setStudentUserId] = useState(null);
  const [schoolId, setSchoolId] = useState(null);
  const [schoolPage, setSchoolPage] = useState(1);
  const [schoolMeta, setSchoolMeta] = useState([]);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const [logsLoading, setLogsLoading] = useState(false);
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [transactionPage, setTransactionPage] = useState(1);
  const [transactionMeta, setTransactionMeta] = useState([]);
  const [logsPage, setLogsPage] = useState(1);
  const [logsMeta, setLogsMeta] = useState([]);
  const [query, setQuery] = useState("");
  const [first, setFirst] = useState("");
  const [schoolQuery, setSchoolQuery] = useState("");
  const [schoolFirst, setSchoolFirst] = useState("");
  const [studentsNumber, setStudentsNumber] = useState(false);
  const [studentProfile, setStudentProfile] = useState(false);
  const [studentContactCount, setStudentContactCount] = useState(false);
  const [studentLogCount, setStudentLogCount] = useState(false);
  const [studentWalletBalance, setStudentWalletBalance] = useState(false);
  const [studentTransfers, setStudentTransfers] = useState(false);
  const [studentContacts, setStudentContacts] = useState(false);

  const [studentLogs, setStudentLogs] = useState([]);
  const [studentTransactions, setStudentTransactions] = useState([]);

  useEffect(() => {
    if (schoolId) {
      getSchoolStudentsToday();
    }
  }, [schoolId]);

  useEffect(() => {
    if (studentId) {
      getStudentProfile();
      getStudentTransfers();
    }
  }, [studentId]);

  useEffect(() => {
    if (studentUserId) {
      countStudentContacts();
      countLogs();
      getStudentWalletBalance();
      getStudentContacts();
    }
  }, [studentUserId]);

  useEffect(() => {
    if (studentUserId) {
      getStudentTransactions(transactionPage, studentUserId);
    }
  }, [transactionPage, studentUserId]);

  useEffect(() => {
    if (studentUserId) {
      getStudentLogs(logsPage, studentUserId);
    }
  }, [logsPage, studentUserId]);

    useEffect(()=>{
         getStudentsNumber();
   }, [])
  
   const getStudentsNumber = async () => {
    setStudentsNumber(false);
    const server_response = await ajaxStudent.fetchAllStudentsNumber();
    if (server_response.status === "OK") {
      //store results
      setStudentsNumber(server_response.details);
    } else {
      //communicate error
      setStudentsNumber("404");
    }
  };

  const getStudentList = async (currentPage) => {
    setStudentList([]);
    setLoading2(true);
    const server_response = await ajaxStudent.fetchAllStudents(currentPage);
    setLoading2(false);
    if (server_response.status === "OK") {
      setFirst(server_response.details.meta.offset_count);
      setMeta(server_response.details.meta.list_of_pages);
      setStudentList(server_response.details.list || []);
    } else {
      setStudentList([]);
    }
  };


  const getSchoolStudentList = async (currentPage) => {
    if (!schoolId) return;
    setLoading2(true);
    const server_response = await ajaxStudent.fetchStudentList(currentPage, schoolId);
    setLoading2(false);
    if (server_response.status === "OK") {
      setSchoolFirst(server_response.details.meta.offset_count);
      setSchoolMeta(server_response.details.meta.list_of_pages);
      setSchoolStudentList(server_response.details.list || []);
    } else {
      setSchoolStudentList([]);
    }
    
  };


  const searchStudents = async (e) => {
    if (e) {
        e.preventDefault();
    }
    setLoading(true);
    const server_response = await ajaxStudent.searchAllStudents(query, page);
    setLoading(false);
    if (server_response.status === "OK") {
      setFirst(server_response.details.meta.offset_count);
      setMeta(server_response.details.meta.list_of_pages);
      setStudentList(server_response.details.list || []);
    } else {
      setStudentList([]);
    }
    
  };

  const searchSchoolStudents = async (e) => {
    if (e) {
      e.preventDefault();
    }
    if (!schoolId) return;

    setLoading(true);
    const server_response = await ajaxStudent.searchSchoolStudents(schoolPage, schoolId, schoolQuery);
    setLoading(false);
    if (server_response.status === "OK") {
        setSchoolFirst(server_response.details.meta.offset_count);
        setSchoolMeta(server_response.details.meta.list_of_pages);
        setSchoolStudentList(server_response.details.list || []);
    } else {
        setSchoolStudentList([]);
    }
    
  };

  const getStudentProfile = async () => {
    if (!studentId) return;
    const server_response = await ajaxStudent.fetchStudentData(studentId);
    if (server_response.status === "OK") {
      //store results
      setStudentProfile(server_response.details);
    } else {
      //communicate error
      setStudentProfile("404");
    }
  };

  const getStudentTransfers = async () => {
    if (!studentId) return;
    const server_response = await ajaxStudent.listStudentTransfers(studentId);
    if (server_response.status === "OK") {
      setStudentTransfers(server_response.details);
    } else {
      setStudentTransfers("404");
    }
  };

  const getStudentContacts = async () => {
    if (!studentUserId) return;
    const server_response = await ajaxStudent.fetchStudentContacts(studentUserId);
    if (server_response.status === "OK") {
      setStudentContacts(server_response.details);
    } else {
      //communicate error
      setStudentContacts("404");
    }
  };

  const countStudentContacts = async () => {
    if (!studentUserId) return;
    const server_response = await ajaxStudent.countStudentContacts(studentUserId);
    if (server_response.status === "OK") {
      setStudentContactCount(server_response.details);
    } else {
      //communicate error
      setStudentContactCount("404");
    }
  };

  const getStudentLogs = async (currentPage) => {
    if (!studentUserId) return;
    setLogsLoading(true);
    const server_response = await ajaxCallStation.listStudentCallLogs(
      currentPage,
      studentUserId
    );
    setLogsLoading(false);
    if (server_response.status === "OK") {
      setLogsMeta(server_response.details.meta.list_of_pages);
      setStudentLogs(server_response.details.list|| []);
    } else {
      setStudentLogs([]);
    }
  };

  const getStudentTransactions = async (currentPage) => {
    if (!studentUserId) return;
    setTransactionLoading(true);
    const server_response = await ajaxBank.fetchUserWalletTransactions(currentPage, studentUserId);
    setTransactionLoading(false);
    if (server_response.status === "OK") {
      setTransactionMeta(server_response.details.meta.list_of_pages);
      setStudentTransactions(server_response.details.list);
    } else {
      setStudentTransactions([]);
    }
  };

  const countLogs = async () => {
    if (!studentUserId) return;
    const server_response = await ajaxCallStation.countStudentLogs(studentUserId);
    if (server_response.status === "OK") {
      setStudentLogCount(server_response.details);
    } else {
      setStudentLogCount("404");
    }
  };

  const getStudentWalletBalance = async () => {
    if (!studentUserId) return;
    const server_response = await ajaxBank.fetchStudentWalletBalance(studentUserId);
    if (server_response.status === "OK") {
      setStudentWalletBalance(server_response.details);
    } else {
      setStudentWalletBalance('0');
    }
  };

  const getStudentsToday = async () => {
    const server_response = await ajaxStudent.fetchAllStudentsToday();
    if (server_response.status === "OK") {
      setStudentsToday(server_response.details);
    } else {
      setStudentsToday("404");
    }
  };

  const getSchoolStudentsToday = async () => {
    if (!schoolId) return;
    const server_response = await ajaxStudent.fetchStudentsToday(studentId);
    if (server_response.status === "OK") {
      setSchoolStudentsToday(server_response.details);
    } else {
      setSchoolStudentsToday("404");
    }
  };
    
    return (
           <StudentContext.Provider value={
               {
                    studentsNumber,
                    studentList,
                    schoolStudentList,
                    studentsToday,
                    schoolStudentsToday,
                    studentId,
                    studentUserId,
                    studentProfile,
                    studentContactCount,
                    studentLogCount,
                    studentWalletBalance,
                    studentTransfers,
                    studentContacts,
                    studentLogs,
                    studentTransactions,
                    transactionLoading,
                    schoolFirst,
                    schoolId,
                    schoolMeta,
                    schoolPage,
                    schoolQuery,
                    transactionMeta,
                    transactionPage,
                    logsMeta,
                    logsPage,
                    logsLoading,
                    meta,
                    query,
                    page,
                    first,
                    loading,
                    loading2,
                    setStudentId,
                    setStudentUserId,
                    setSchoolId,
                  getStudentsNumber,
                  getStudentList,
                  getStudentProfile,
                  searchStudents,
                  getStudentsToday,
                  setMeta,
                  setQuery,
                  setPage,
                  setSchoolFirst,
                  setSchoolMeta,
                  setSchoolPage,
                  setSchoolQuery,
                  setTransactionPage,
                  setLogsPage,
                  countStudentContacts,
                  getStudentWalletBalance,
                  getStudentTransfers,
                  getStudentContacts,
                  getStudentLogs,
                  getStudentTransactions,
                  searchSchoolStudents,
                  getSchoolStudentList,
                  getSchoolStudentsToday
                
               }
               }>
               {props.children}
           </StudentContext.Provider>
        );
    
}

export default StudentContext;