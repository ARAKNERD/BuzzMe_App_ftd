import React, { useEffect, useState } from 'react';
import ajaxAdmin from '../util/remote/ajaxAdmin';
import ajaxSchool from '../util/remote/ajaxSchool';

const AdminContext = React.createContext();

export const AdminConsumer = AdminContext.Consumer;

export const AdminProvider = (props)=> {

   
   const [adminList, setAdminList] = useState(false);
   const [boothAssistantList, setBoothAssistantList] = useState(false);
   const [schoolAdminList, setSchoolAdminList] = useState(false);

   const [data, setData]= useState({page:"1"})

   useEffect(()=>{
         getAdminList();
   }, [data])
  
   const getAdminList =async()=>{

      const server_response = await ajaxAdmin.fetchAdminList(data);
      if(server_response.status==="OK"){
         //store results
         setAdminList(server_response.details);
      }else{
         //communicate error
         setAdminList("404");
      }
   }

   const getBoothAssistantList =async()=>{

      const server_response = await ajaxSchool.fetchBoothAssistants();
      if(server_response.status==="OK"){
         //store results
         setBoothAssistantList(server_response.details);
      }else{
         //communicate error
         setBoothAssistantList("404");
      }
   }

   const getSchoolAdminList =async()=>{

      const server_response = await ajaxSchool.fetchSchoolUserList();
      if(server_response.status==="OK"){
         //store results
         setSchoolAdminList(server_response.details);
      }else{
         //communicate error
         setSchoolAdminList("404");
      }
   }
    
    return (
           <AdminContext.Provider value={
               {
                    adminList,
                    boothAssistantList,
                    schoolAdminList,
                  setData,
                  getAdminList,
                  getBoothAssistantList,
                  getSchoolAdminList
               }
               }>
               {props.children}
           </AdminContext.Provider>
        );
    
}

export default AdminContext;