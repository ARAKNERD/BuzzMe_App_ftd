import React from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import TableHeader from "../../Components/Common/TableHeader";

function StatisticsPage() {
 
  return (
    <AppContainer title="Statistics">

<div className="row">
        <div className="col-lg-4">
        <div className="row">
            <div class="col-lg-12">
							<div class="card custom-card " style={{paddingBottom:"10px"}}>
              <div className="card-body map-card gradient-orange-peel">
              <div class="item-title mb-3" style={{color:"white"}}><b>TOTAL COLLECTIONS</b></div>
								
									
										<div class="text-center" >
											<h1 class="mb-2 number-font" style={{color:"white"}}><span class="counter">UGX. 10,020,000</span></h1>
									
										</div>
									
                                    
								</div>
							</div></div>
              </div>

        </div>
        

        <div className="col-lg-8">
        <div className="row">
            <div class="col-lg-12">
							<div class="card custom-card " style={{paddingBottom:"10px"}}>
              <div className="card-body map-card gradient-my-blue">
              <div class="item-title mb-2" style={{color:"white"}}><b>BREAKDOWN IN COLLECTIONS </b></div>
								<div class="row" >
									<div class="col-xl-4 col-lg-12 col-sm-6 pr-0 pl-0 border-right" >
										<div class="text-center" >
                                        <h2 class="mb-1 number-font" style={{color:"white"}}><span class="counter">4,005,000</span></h2>
                                        <p class="mb-0 text-light"> Account Activations</p>
										</div>
									</div>
                                    <div class="col-xl-4 col-lg-12 col-sm-6 pr-0 pl-0 border-right" >
										<div class="text-center" >
                                        <h2 class="mb-1 number-font" style={{color:"white"}}><span class="counter">3,100,500</span></h2>
                                        <p class="mb-0 text-light"> Call Charges</p>
										</div>
									</div>
									<div class="col-xl-4 col-lg-12 col-sm-6 pr-0 pl-0">
										<div class="text-center">
											<h2 class="mb-1 number-font" style={{color:"white"}}><span class="counter">2,200,500</span></h2>
											<p class="mb-0 text-light"> Message Charges</p>
										</div>
									</div>
                                  
								</div></div>
							</div></div>
                            
              </div>
        </div>
      </div>
      <div className="row">
      <div class="col-lg-12">
          <div className="card custom-card">
            <div className="card-body map-card">
              <div class="heading-layout1 mg-b-25">
                <TableHeader
                  title="Messages Profit Statement"
                  subtitle="List of the schools with the different message statistics"
                />
                <div class="dropdown">
                                        <a class="dropdown-toggle" href="#" role="button" 
                                        data-toggle="dropdown" aria-expanded="false">...</a>
                
                                       
                                    </div>
              </div>
             
              <div className="border-top mt-3"></div>
              <div className="table-responsive">
                <table className="table table-hover text-nowrap mg-b-0">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>School</th>
                      <th>Unit Price of Message</th>
                      <th>School Price of Message</th>
                      <th>Messages Sold</th>
                      <th>Profit</th>
                    </tr>
                  </thead>
                  <tbody>
                        <tr>
                          <td>1</td>
                          <td>Ntare School</td>
                          <td>UGX.300</td>
                          <td>UGX.500</td>
                          <td>500</td>
                          <td>UGX. 100,000</td>

                        </tr>
                        <tr>
                          <td>2</td>
                          <td>No Holiday Primary School</td>
                          <td>UGX.300</td>
                          <td>UGX.500</td>
                          <td>121</td>
                          <td>UGX. 24,200</td>

                        </tr>
                        <tr>
                          <td>3</td>
                          <td>Light Primary School</td>
                          <td>UGX.300</td>
                          <td>UGX.400</td>
                          <td>200</td>
                          <td>UGX. 20,000</td>

                        </tr>
                    
                  </tbody>
                  
                </table>
              </div>
            </div>
          </div></div>
         
      </div>
     
    </AppContainer>
  );
}

export default StatisticsPage;