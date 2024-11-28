import React, { useState } from 'react';
import ajaxChargeRate from '../util/remote/ajaxChargeRate';

const RateContext = React.createContext();

export const RateConsumer = RateContext.Consumer;

export const RateProvider = (props)=> {

   
   const [rateList, setRateList] = useState(false);
   const [typeList, setTypeList] = useState(false);
   const [schoolRates, setSchoolRates] = useState(false);
   const [loading, setLoading] = useState(false);
  
   const getRateList =async()=>{

      const server_response = await ajaxChargeRate.fetchChargeRateList();
      if(server_response.status==="OK"){
         //store results
         setRateList(server_response.details);
      }else{
         //communicate error
         setRateList("404");
      }
   }

   const getTypeList =async()=>{

      const server_response = await ajaxChargeRate.fetchChargeTypeList();
      if(server_response.status==="OK"){
         //store results
         setTypeList(server_response.details);
      }else{
         //communicate error
         setTypeList("404");
      }
   }

   const getSchoolRates = async () => {
      setLoading(true)
      const server_response = await ajaxChargeRate.fetchSchoolRateList();
      console.log(server_response)
      setLoading(false)
      if (server_response.status === "OK") {
        setSchoolRates(server_response.details);
      }else {
        setSchoolRates("404");
      }
    };
    
    return (
           <RateContext.Provider value={
               {
                    rateList,
                    typeList,
                    schoolRates,
                    loading,
                  getRateList,
                  getTypeList,
                  getSchoolRates
               }
               }>
               {props.children}
           </RateContext.Provider>
        );
    
}

export default RateContext;