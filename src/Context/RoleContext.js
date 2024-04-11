import React, { useEffect, useState } from 'react';
import ajaxRole from '../util/remote/ajaxRole';
import ajaxUser from '../util/remote/ajaxUser';
const RoleContext = React.createContext();

export const RoleConsumer = RoleContext.Consumer;

export const RoleProvider = (props)=> {

   
   const [roleList, setRoleList] = useState(false);
   const [smallRoleList, setSmallRoleList] = useState(false);
   const [data, setData]= useState({page:"1"})

   useEffect(()=>{
         getRoleList();
         getSmallRoleList();
   }, [data])
  
   const getRoleList =async()=>{

      const server_response = await ajaxRole.fetchRoleList(data);
      if(server_response.status==="OK"){
         //store results
         setRoleList(server_response.details);
      }else{
         //communicate error
         setRoleList("404");
      }
   }

   const getSmallRoleList =async()=>{

      const server_response = await ajaxUser.fetchSmallRoleList(data);
      if(server_response.status==="OK"){
         //store results
         setSmallRoleList(server_response.details);
      }else{
         //communicate error
         setSmallRoleList("404");
      }
   }
    
    return (
           <RoleContext.Provider value={
               {
                  
                  roleList,
                  smallRoleList,
                  setData,
                  getRoleList,
                  getSmallRoleList
               }
               }>
               {props.children}
           </RoleContext.Provider>
        );
    
}

export default RoleContext;