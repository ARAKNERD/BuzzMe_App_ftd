import React, { useContext, useEffect} from "react";
import AppContainer from "../Components/Structure/AppContainer";
import CallCategoriesChart from "../Components/Statistics/CallCategoriesChart";
import ChatCategoriesChart from "../Components/Statistics/ChatCategoriesChart";
import AirtimePurchasesChart from "../Components/Statistics/AirtimePurchasesChart";
import AccountActivationsChart from "../Components/Statistics/AccountActivationsChart";
import CallsCostChart from "../Components/Statistics/CallsCostChart";
import ChatCostChart from "../Components/Statistics/ChatCostChart";
import StatisticsContext from "../Context/StatisticsContext";

function StatisticsPage() {
  const {buzzTimeTotal, accountActivationTotal, callChargesTotal, messageChargesTotal, getMessageChargesTotal,
     getCallChargesTotal, getBuzzTimeTotal, getAccountActivationsTotal} = useContext(StatisticsContext);

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
          <div class="card custom-card " style={{paddingBottom:"10px"}}>
            <div className="card-body map-card gradient-my-blue">
              <div class="item-title mb-2" style={{color:"white"}}><b>TOTAL </b></div>
              <div class="row" >
                <div class="col-xl-3 col-lg-12 col-sm-6 pr-0 pl-0 border-right">
                    <div class="text-center">
                      <h2 class="mb-1 number-font" style={{color:"white"}}><span class="counter"><small>UGX. </small>{buzzTimeTotal ? buzzTimeTotal.total_buzztime_c : "..."}</span></h2>
                      <p class="mb-0 text-light"> Buzztime Purchases</p>
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
              </div>
            </div>
          </div>                  
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <div className="row">
            <AirtimePurchasesChart/>

            <AccountActivationsChart/>

            <CallsCostChart/>

            <ChatCostChart/>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="row">
            <CallCategoriesChart/>
            <ChatCategoriesChart/>
          </div>
        </div>
      </div>
     
    </AppContainer>
  );
}

export default StatisticsPage;