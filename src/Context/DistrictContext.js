import React, { useEffect, useState } from 'react';
import ajaxDistrict from '../util/remote/ajaxDistrict';

const DistrictContext = React.createContext();

export const DistrictConsumer = DistrictContext.Consumer;

export const DistrictProvider = (props)=> {

   
   const [districtList, setDistrictList] = useState(false);
   const [data, setData]= useState({page:"1"})

   useEffect(()=>{
         getDistrictList();
   }, [data])
  
   const getDistrictList =async()=>{

      const server_response = await ajaxDistrict.fetchDistrictList(data);
      if(server_response.status==="OK"){
         //store results
         setDistrictList(server_response.details);
      }else{
         //communicate error
         setDistrictList("404");
      }
   }
    
    return (
           <DistrictContext.Provider value={
               {
                    districtList,
                  setData,
                  getDistrictList
               }
               }>
               {props.children}
           </DistrictContext.Provider>
        );
    
}

export default DistrictContext;