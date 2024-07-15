import React, { useEffect, useState } from 'react';
import ajaxStudent from '../util/remote/ajaxStudent';

const StudentContext = React.createContext();

export const StudentConsumer = StudentContext.Consumer;

export const StudentProvider = (props)=> {

   
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
    
    return (
           <StudentContext.Provider value={
               {
                    studentsNumber,
                  getStudentsNumber,
               }
               }>
               {props.children}
           </StudentContext.Provider>
        );
    
}

export default StudentContext;