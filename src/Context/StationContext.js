import React, { useEffect, useState } from 'react';
import ajaxStation from '../util/remote/ajaxStation';

const StationContext = React.createContext();

export const StationConsumer = StationContext.Consumer;

export const StationProvider = (props)=> {

   
   const [stationList, setStationList] = useState(false);
   const [data, setData]= useState({school_id:""})

   useEffect(()=>{
         getStationList();
   }, [data])
  
   const getStationList =async()=>{

      const server_response = await ajaxStation.fetchStationList(data);
      if(server_response.status==="OK"){
         //store results
         setStationList(server_response.details);
      }else{
         //communicate error
         setStationList("404");
      }
   }
    
    return (
           <StationContext.Provider value={
               {
                  
                  stationList,
                  setData,
                  getStationList
               }
               }>
               {props.children}
           </StationContext.Provider>
        );
    
}

export default StationContext;