import React, { useEffect, useState } from 'react';
import ajaxChargeRate from '../util/remote/ajaxChargeRate';

const RateContext = React.createContext();

export const RateConsumer = RateContext.Consumer;

export const RateProvider = (props)=> {

   
   const [rateList, setRateList] = useState(false);
   const [data, setData]= useState({page:"1"})

   useEffect(()=>{
         getRateList();
   }, [data])
  
   const getRateList =async()=>{

      const server_response = await ajaxChargeRate.fetchChargeRateList(data);
      if(server_response.status==="OK"){
         //store results
         setRateList(server_response.details);
      }else{
         //communicate error
         setRateList("404");
      }
   }
    
    return (
           <RateContext.Provider value={
               {
                    rateList,
                  setData,
                  getRateList
               }
               }>
               {props.children}
           </RateContext.Provider>
        );
    
}

export default RateContext;