import React, { useEffect, useState } from 'react';
import ajaxSchool from '../util/remote/ajaxSchool';

const SchoolContext = React.createContext();

export const SchoolConsumer = SchoolContext.Consumer;

export const SchoolProvider = (props)=> {

   
   const [schoolList, setSchoolList] = useState(false);
   const [data, setData]= useState({page:"1"})

   useEffect(()=>{
         getSchoolList();
   }, [data])
  
   const getSchoolList =async()=>{

      const server_response = await ajaxSchool.fetchSchoolList(data);
      if(server_response.status==="OK"){
         //store results
         setSchoolList(server_response.details);
      }else{
         //communicate error
         setSchoolList("404");
      }
   }
    
    return (
           <SchoolContext.Provider value={
               {
                    schoolList,
                  setData,
                  getSchoolList
               }
               }>
               {props.children}
           </SchoolContext.Provider>
        );
    
}

export default SchoolContext;