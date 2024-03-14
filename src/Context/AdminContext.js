import React, { useEffect, useState } from 'react';
import ajaxAdmin from '../util/remote/ajaxAdmin';

const AdminContext = React.createContext();

export const AdminConsumer = AdminContext.Consumer;

export const AdminProvider = (props)=> {

   
   const [adminList, setAdminList] = useState(false);
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
    
    return (
           <AdminContext.Provider value={
               {
                    adminList,
                  setData,
                  getAdminList
               }
               }>
               {props.children}
           </AdminContext.Provider>
        );
    
}

export default AdminContext;