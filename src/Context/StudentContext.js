import React, { useEffect, useState } from 'react';
import ajaxStudent from '../util/remote/ajaxStudent';

const StudentContext = React.createContext();

export const StudentConsumer = StudentContext.Consumer;

export const StudentProvider = (props)=> {

   
   const [studentList, setStudentList] = useState(false);
   const [data, setData]= useState({page:"1"})

   useEffect(()=>{
         getStudentList();
   }, [data])
  
   const getStudentList =async()=>{

      const server_response = await ajaxStudent.fetchStudentList(data);
      if(server_response.status==="OK"){
         //store results
         setStudentList(server_response.details);
      }else{
         //communicate error
         setStudentList("404");
      }
   }
    
    return (
           <StudentContext.Provider value={
               {
                    studentList,
                  setData,
                  getStudentList
               }
               }>
               {props.children}
           </StudentContext.Provider>
        );
    
}

export default StudentContext;