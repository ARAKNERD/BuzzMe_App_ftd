import React, { useEffect, useState } from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import TableHeader from "../../Components/Common/TableHeader";
import ajaxBank from "../../util/remote/ajaxBank";

function StatisticsPage() {

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

  useEffect(() => {
    getBuzzTimeTotal();
    getAccountActivationsTotal();
    getCallChargesTotal();
    getMessageChargesTotal();
  }, []);
 
  return (
    <AppContainer title="Statistics">

      <div className="row">
        

        <div className="col-lg-12">
        <div className="row">
            <div class="col-lg-12">
							<div class="card custom-card " style={{paddingBottom:"10px"}}>
              <div className="card-body map-card gradient-my-blue">
              <div class="item-title mb-2" style={{color:"white"}}><b>TOTAL </b></div>
								<div class="row" >
                <div class="col-xl-3 col-lg-12 col-sm-6 pr-0 pl-0 border-right">
										<div class="text-center">
											<h2 class="mb-1 number-font" style={{color:"white"}}><span class="counter"><small>UGX. </small>{buzzTimeTotal ? buzzTimeTotal.total_buzztime_c : "..."}</span></h2>
											<p class="mb-0 text-light"> Airtime Purchases</p>
										</div>
									</div>
									<div class="col-xl-3 col-lg-12 col-sm-6 pr-0 pl-0 border-right" >
										<div class="text-center" >
                                        <h2 class="mb-1 number-font" style={{color:"white"}}><span class="counter"><small>UGX. </small>{accountActivationTotal ? accountActivationTotal.total_account_activations_c : "..."}</span></h2>
                                        <p class="mb-0 text-light"> Account Activations</p>
										</div>
									</div>
                                    <div class="col-xl-3 col-lg-12 col-sm-6 pr-0 pl-0 border-right" >
										<div class="text-center" >
                                        <h2 class="mb-1 number-font" style={{color:"white"}}><span class="counter"><small>UGX. </small>{callChargesTotal ? callChargesTotal.total_call_charges_c : "..."}</span></h2>
                                        <p class="mb-0 text-light"> Call Charges</p>
										</div>
									</div>
									<div class="col-xl-3 col-lg-12 col-sm-6 pr-0 pl-0" >
										<div class="text-center" >
                                        <h2 class="mb-1 number-font" style={{color:"white"}}><span class="counter"><small>UGX. </small>{messageChargesTotal ? messageChargesTotal.total_message_charges_c : "..."}</span></h2>
                                        <p class="mb-0 text-light"> Message Charges</p>
										</div>
									</div>
                                  
								</div></div>
							</div></div>
                            
              </div>
        </div>
      </div>
      <div className="row">
         
      </div>
     
    </AppContainer>
  );
}

export default StatisticsPage;