import React, { useEffect, useState } from 'react';
import ajaxParent from '../util/remote/ajaxParent';

const ParentContext = React.createContext();

export const ParentConsumer = ParentContext.Consumer;

export const ParentProvider = (props)=> {

   
   const [parentList, setParentList] = useState(false);
   const [data, setData]= useState({page:"1"})

   useEffect(()=>{
         getParentList();
   }, [data])
  
   const getParentList =async()=>{

      const server_response = await ajaxParent.fetchParentList(data);
      if(server_response.status==="OK"){
         //store results
         setParentList(server_response.details);
      }else{
         //communicate error
         setParentList("404");
      }
   }
    
    return (
           <ParentContext.Provider value={
               {
                    parentList,
                  setData,
                  getParentList
               }
               }>
               {props.children}
           </ParentContext.Provider>
        );
    
}

export default ParentContext;