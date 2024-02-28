import React, { useEffect, useState } from 'react';
import ajaxStudentGroup from '../util/remote/ajaxStudentGroup';

const StudentGroupContext = React.createContext();

export const StudentGroupConsumer = StudentGroupContext.Consumer;

export const StudentGroupProvider = (props)=> {

   
   const [groupList, setGroupList] = useState(false);
   const [data, setData]= useState({page:"1"})

   useEffect(()=>{
         getGroupList();
   }, [data])
  
   const getGroupList =async()=>{

      const server_response = await ajaxStudentGroup.fetchGroupList(data);
      if(server_response.status==="OK"){
         //store results
         setGroupList(server_response.details);
      }else{
         //communicate error
         setGroupList("404");
      }
   }
    
    return (
           <StudentGroupContext.Provider value={
               {
                    groupList,
                  setData,
                  getGroupList
               }
               }>
               {props.children}
           </StudentGroupContext.Provider>
        );
    
}

export default StudentGroupContext;