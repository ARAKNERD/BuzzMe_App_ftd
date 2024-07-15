import React, { useEffect, useState } from 'react';
import ajaxCallStation from '../util/remote/ajaxCallStation';
const StationContext = React.createContext();

export const StationConsumer = StationContext.Consumer;

export const StationProvider = (props)=> {

   
    const [stationNumber, setStationNumber] = useState(false);

    useEffect(()=>{
         getStationNumber();
   }, [])
  
   const getStationNumber = async () => {
    setStationNumber(false)
    const server_response = await ajaxCallStation.countAllStations();
    if (server_response.status === "OK") {
      //store results
      setStationNumber(server_response.details);
    } else {
      //communicate error
      setStationNumber("404");
    }
  };
    
    return (
           <StationContext.Provider value={
               {
                    stationNumber,
                  getStationNumber,
               }
               }>
               {props.children}
           </StationContext.Provider>
        );
    
}

export default StationContext;