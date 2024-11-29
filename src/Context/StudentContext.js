import React, { useEffect, useState } from 'react';
import ajaxStudent from '../util/remote/ajaxStudent';

const StudentContext = React.createContext();

export const StudentConsumer = StudentContext.Consumer;

export const StudentProvider = (props)=> {

  const [studentList, setStudentList] = useState([]);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [query, setQuery] = useState("");
  const [first, setFirst] = useState("");
  const [studentsNumber, setStudentsNumber] = useState(false);

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
    
    return (
           <StudentContext.Provider value={
               {
                    studentsNumber,
                    studentList,
                    meta,
                    query,
                    page,
                    first,
                    loading,
                    loading2,
                  getStudentsNumber,
                  getStudentList,
                  searchStudents,
                  setMeta,
                  setQuery,
                  setPage
               }
               }>
               {props.children}
           </StudentContext.Provider>
        );
    
}

export default StudentContext;