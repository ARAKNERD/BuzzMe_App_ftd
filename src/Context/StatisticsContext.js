import React, { useState } from 'react';
import ajaxBank from '../util/remote/ajaxBank';

const StatisticsContext = React.createContext();

export const StatisticsConsumer = StatisticsContext.Consumer;

export const StatisticsProvider = (props)=> {

  const [buzzTimeTotal, setBuzzTimeTotal] = useState(false);
  const [accountActivationTotal, setAccountActivationTotal] = useState(false);
  const [callChargesTotal, setCallChargesTotal] = useState(false);
  const [messageChargesTotal, setMessageChargesTotal] = useState(false);

  const getBuzzTimeTotal = async () => {
    const server_response = await ajaxBank.fetchBuzzTimeTotal();
    if (server_response.status === "OK") {
      setBuzzTimeTotal(server_response.details);
    } else {
      setBuzzTimeTotal("404");
    }
  };

  const getAccountActivationsTotal = async () => {
    const server_response = await ajaxBank.fetchAccountActivationsTotal();
    if (server_response.status === "OK") {
      setAccountActivationTotal(server_response.details);
    } else {
      setAccountActivationTotal("404");
    }
  };

  const getCallChargesTotal = async () => {
    const server_response = await ajaxBank.fetchTotalCallCharges();
    if (server_response.status === "OK") {
      setCallChargesTotal(server_response.details);
    } else {
      setCallChargesTotal("404");
    }
  };

  const getMessageChargesTotal = async () => {
    const server_response = await ajaxBank.fetchTotalMessageCharges();
    if (server_response.status === "OK") {
      setMessageChargesTotal(server_response.details);
    } else {
      setMessageChargesTotal("404");
    }
  };


    
  return (
    <StatisticsContext.Provider value={
      {
        buzzTimeTotal,
        accountActivationTotal,
        callChargesTotal,
        messageChargesTotal,
        getBuzzTimeTotal,
        getAccountActivationsTotal,
        getCallChargesTotal,
        getMessageChargesTotal
        

      }
    }>
    {props.children}
    </StatisticsContext.Provider>
  );
    
}

export default StatisticsContext;