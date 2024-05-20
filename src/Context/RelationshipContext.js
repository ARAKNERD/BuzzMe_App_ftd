import React, { useEffect, useState } from 'react';
import ajaxParent from '../util/remote/ajaxParent';

const RelationshipContext = React.createContext();

export const RelationshipConsumer = RelationshipContext.Consumer;

export const RelationshipProvider = (props)=> {

   
   const [relationList, setRelationList] = useState(false);
   const [data, setData]= useState({page:"1"})

   useEffect(()=>{
         getRelationList();
   }, [data])
  
   const getRelationList =async()=>{

      const server_response = await ajaxParent.listRelations(data);
      if(server_response.status==="OK"){
         //store results
         setRelationList(server_response.details);
      }else{
         //communicate error
         setRelationList("404");
      }
   }
    
    return (
           <RelationshipContext.Provider value={
               {
                    relationList,
                  setData,
                  getRelationList
               }
               }>
               {props.children}
           </RelationshipContext.Provider>
        );
    
}

export default RelationshipContext;