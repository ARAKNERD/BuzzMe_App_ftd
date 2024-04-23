import React, { useEffect, useState } from 'react';
import ajaxSchool from '../util/remote/ajaxSchool';
import ajaxStudentGroup from '../util/remote/ajaxStudentGroup';
import { useContext } from 'react';
import AuthContext from './AuthContext';

const SchoolContext = React.createContext();

export const SchoolConsumer = SchoolContext.Consumer;

export const SchoolProvider = (props)=> {

   
   const [schoolList, setSchoolList] = useState(false);
   const {user} = useContext(AuthContext);
   const [recentSchools, setRecentSchools] = useState(false);
   const [schoolGroups, setSchoolGroups] = useState(false);
   const [data, setData]= useState({page:"1"})


   useEffect(()=>{
         getSchoolList();
         getRecentSchools();
   }, [data])

   useEffect(()=>{
      if(user){
         getGroups();
             
      }
   }, [user])
  
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

   const getRecentSchools =async()=>{

      const server_response = await ajaxSchool.fetchTodaySchools(data);
      if(server_response.status==="OK"){
         //store results
         setRecentSchools(server_response.details);
      }else{
         //communicate error
         setRecentSchools("404");
      }
   }

   const getGroups = async () => {
      setSchoolGroups(false);
      const server_response = await ajaxStudentGroup.fetchGroupList(user.school);
      if (server_response.status === "OK") {
         setSchoolGroups(server_response.details);
      }
      else{
         //communicate error
         setSchoolGroups("404");
      }
   };
    
    return (
           <SchoolContext.Provider value={
               {
                    schoolList,
                    recentSchools,
                    schoolGroups,
                  setData,
                  getSchoolList,
                  getRecentSchools,
                  getGroups
               }
               }>
               {props.children}
           </SchoolContext.Provider>
        );
    
}

export default SchoolContext;