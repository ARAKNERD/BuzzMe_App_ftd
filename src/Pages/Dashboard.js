import React, {useEffect, useState} from "react";
import AppContainer from "../Components/Structure/AppContainer";
import ajaxSchool from "../util/remote/ajaxSchool";
import ajaxStudent from "../util/remote/ajaxStudent";
import TableHeader from "../Components/Common/TableHeader";
import {Toaster, toast} from "react-hot-toast";
import Loader from "../Components/Common/Loader";
import {Link} from "react-router-dom";
import ajaxCallStation from "../util/remote/ajaxCallStation";
import WeeklyLogsChart from "./WeeklyLogsChart";
import ajaxBank from "../util/remote/ajaxBank";

function Dashboard() {

  const [schoolsNumber, setSchoolsNumber] = useState(false);
  const [studentsNumber, setStudentsNumber] = useState(false);
  const [logsNumber, setLogsNumber] = useState(false);
  const [logsThisWeek, setLogsThisWeek] = useState(false);
  const [logsThisMonth, setLogsThisMonth] = useState(false);
  const [stationNumber, setStationNumber] = useState(false);
  const [buzzTimeUsed, setBuzzTimeUsed] = useState(false);
  const [buzzTimeLoaded, setBuzzTimeLoaded] = useState(false);

  const [loading, setLoading] = useState(false);
  const [transactionList, setTransactionList] = useState(false);


  const getStudentsNumber = async () => {
    const server_response = await ajaxStudent.fetchAllStudentsNumber();
    if (server_response.status === "OK") {
      //store results
      setStudentsNumber(server_response.details);
    } else {
      //communicate error
      setStudentsNumber("404");
    }
  };
  const getStationNumber = async () => {
    const server_response = await ajaxCallStation.countAllStations();
    if (server_response.status === "OK") {
      //store results
      setStationNumber(server_response.details);
    } else {
      //communicate error
      setStationNumber("404");
    }
  };
  const getSchoolsNumber = async () => {
    const server_response = await ajaxSchool.fetchSchoolNumber();
    if (server_response.status === "OK") {
      //store results
      setSchoolsNumber(server_response.details);
    } else {
      //communicate error
      setSchoolsNumber("404");
    }
  };
  const getLogsNumber = async () => {
    const server_response = await ajaxCallStation.countLogsToday();

    if (server_response.status === "OK") {
      //store results
      setLogsNumber(server_response.details);
    } else {
      //communicate error
      setLogsNumber("404");
    }
  };
  const getLogsThisMonth = async () => {
    const server_response = await ajaxCallStation.countLogsThisMonth();

    if (server_response.status === "OK") {
      //store results
      setLogsThisMonth(server_response.details);
    } else {
      //communicate error
      setLogsThisMonth("404");
    }
  };
  const getLogsThisWeek = async () => {
    const server_response = await ajaxCallStation.countLogsThisWeek();

    if (server_response.status === "OK") {
      //store results
      setLogsThisWeek(server_response.details);
    } else {
      //communicate error
      setLogsThisWeek("404");
    }
  };

  const getTransactions = async () => {
    setLoading(true);
    const server_response = await ajaxBank.fetchRecentTransactions();
    setLoading(false);
    if (server_response.status === "OK") {
      setTransactionList(server_response.details);

    }else {
      setTransactionList("404");
    }
  };
  const getBuzzTimeUsed = async () => {
    const server_response = await ajaxBank.fetchBuzzTimeUsed();

    if (server_response.status === "OK") {
      //store results
      setBuzzTimeUsed(server_response.details);
    } else {
      //communicate error
      setBuzzTimeUsed("404");
    }
  };
  const getBuzzTimeLoaded = async () => {
    const server_response = await ajaxBank.fetchBuzzTimeLoaded();

    if (server_response.status === "OK") {
      //store results
      setBuzzTimeLoaded(server_response.details);
    } else {
      //communicate error
      setBuzzTimeLoaded("404");
    }
  };
  useEffect(() => {
    getStudentsNumber();
    getSchoolsNumber();
    getLogsNumber();
    getStationNumber();
    getTransactions();
    getLogsThisMonth();
    getLogsThisWeek();
    getBuzzTimeUsed();
    getBuzzTimeLoaded();
  }, []);

  return (
    <div>
      <AppContainer title={"Dashboard"}>
        <Toaster position="top-center" reverseOrder={false} />

          <div class="row gutters-20">
            <div class="col-7-xxxl col-12">
              <div class="row">
                <div class="col-lg-6">
                            <div class="dashboard-summery-one mg-b-20 gradient-my-blue">
                <div class="row align-items-center">
                  <div class="col-5">
                    <div class="item-icon bg-light">
                      <img alt="avatar" style={{height:"60px"}} src={process.env.PUBLIC_URL + "/assets/img/figure/school.png"}/>
                    </div>
                  </div>
                  <div class="col-7">
                    <div class="item-content">
                      <div class="item-title" style={{color:"white"}}>Schools Registered</div>
                      <div class="item-number" style={{color:"white"}}><span class="counter">{schoolsNumber ? schoolsNumber.total_p : "..."}</span></div>
                    </div>
                  </div>
                </div>
              </div>
                </div>
                <div class="col-lg-6">
                            <div class="dashboard-summery-one mg-b-20 gradient-my-blue">
                            <div class="row align-items-center">
                                <div class="col-6">
                                    <div class="item-icon bg-light">
                                    <img alt="avatar" style={{height:"60px"}} src={
                      process.env.PUBLIC_URL + "/assets/img/figure/phone-booth.png"
                    }/>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="item-content">
                                        <div class="item-title" style={{color:"white"}}>Active Stations</div>
                                        <div class="item-number" style={{color:"white"}}><span class="counter">{stationNumber ? stationNumber.total_p : "..."}</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                <div class="col-lg-6">
                            <div class="dashboard-summery-one mg-b-20 gradient-my-blue">
                            <div class="row align-items-center">
                                <div class="col-5">
                                    <div class="item-icon bg-light">
                                    <img alt="avatar" style={{height:"60px"}} src={
                      process.env.PUBLIC_URL + "/assets/img/figure/phone-call.png"
                    }/>
                                    </div>
                                </div>
                                <div class="col-7">
                                    <div class="item-content">
                                        <div class="item-title" style={{color:"white"}}>Contacts Registered</div>
                                        <div class="item-number" style={{color:"white"}}><span class="counter">00</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                <div class="col-lg-6">
                            <div class="dashboard-summery-one mg-b-20 gradient-my-blue" >
                            <div class="row align-items-center">
                                <div class="col-4">
                                    <div class="item-icon bg-light">
                                    <img alt="avatar" style={{height:"60px"}} src={
                      process.env.PUBLIC_URL + "/assets/img/figure/students.png"
                    }/>
                                    </div>
                                </div>
                                <div class="col-8">
                                    <div class="item-content">
                                        <div class="item-title" style={{color:"white"}}>Students Registered</div>
                                        <div class="item-number" style={{color:"white"}}><span class="counter">{studentsNumber ? studentsNumber.total_p : "..."}</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
              </div>
            </div>
            <div class="col-5-xxxl col-12">
            <div className="row">
            <div class="col-lg-12">
							<div class="card custom-card " style={{paddingBottom:"10px"}}>
              <div className="card-body map-card gradient-orange-peel">
              <div class="item-title mb-2" style={{color:"white"}}><b>TODAY</b></div>
								<div class="row" >
									<div class="col-xl-6 col-lg-12 col-sm-6 pr-0 pl-0 border-right" >
										<div class="text-center" >
											<h2 class="mb-1 number-font" style={{color:"white"}}><span class="counter"><small>UGX. </small>{buzzTimeLoaded ? buzzTimeLoaded.total_p : "..."}</span></h2>
											<p class="mb-0 text-light"> Buzz Time Loaded</p>
										</div>
									</div>
									<div class="col-xl-6 col-lg-12 col-sm-6 pr-0 pl-0">
										<div class="text-center">
											<h2 class="mb-1 number-font" style={{color:"white"}}><span class="counter"><small>UGX. </small>{buzzTimeUsed ? buzzTimeUsed.total_p : "..."}</span></h2>
											<p class="mb-0 text-light"> Buzz Time Used</p>
										</div>
									</div>
								
								</div></div>
							</div></div>
            <div class="col-lg-12">
							<div class="card custom-card" style={{paddingBottom:"10px"}}>
              <div className="card-body map-card gradient-orange-peel">
              <div class="item-title mb-2" style={{color:"white"}}><b>BUZZ CALLS</b></div>
								<div class="row" >
									<div class="col-xl-4 col-lg-12 col-sm-6 pr-0 pl-0 border-right" >
										<div class="text-center" >
											<h2 class="mb-1 number-font" style={{color:"white"}}><span class="counter">{logsNumber ? logsNumber.total_p : "..."}</span></h2>
											<p class="mb-0 text-light"> Today</p>
										</div>
									</div>
									<div class="col-xl-4 col-lg-12 col-sm-6 pr-0 pl-0 border-right">
										<div class="text-center">
											<h2 class="mb-1 number-font" style={{color:"white"}}><span class="counter">{logsThisWeek ? logsThisWeek.total_p : "..."}</span></h2>
											<p class="mb-0 text-light"> This Week</p>
										</div>
									</div>
									<div class="col-xl-4 col-lg-12 col-sm-6 pr-0 pl-0">
										<div class="text-center">
											<h2 class="mb-1 number-font" style={{color:"white"}}><span class="counter">{logsThisMonth ? logsThisMonth.total_p : "..."}</span></h2>
											<p class="mb-0 text-light">This Month</p>
										</div>
									</div>
								
								</div></div>
							</div></div>
              </div>
					  </div> 
          </div>

          <div class="row gutters-20">
            <WeeklyLogsChart/>

            <div class="col-6-xxxl col-12">
            <div
             className="card custom-card"
             style={{borderRadius: "10px"}}>
             <div className="card-body map-card">
               <div class="heading-layout1 mg-b-25">
                 <TableHeader
                   title="Recent Transactions"
                   subtitle="List of recent transactions"
                  
                 />
                 <div class="dropdown">
                   <a
                     class="dropdown-toggle"
                     href="#"
                     role="button"
                     data-toggle="dropdown"
                     aria-expanded="false">
                     ...
                   </a>

                   <div class="dropdown-menu dropdown-menu-right">
                     <Link class="dropdown-item" to={'/transactions/all'}>
                       <i class="fa-solid fa-eye text-orange-peel"></i>
                       View All
                     </Link>
                   </div>
                 </div>
               </div>
               <div className="border-top mt-3"></div>
               <div className="table-responsive">
                 <table className="table table-hover text-nowrap mg-b-0">
                   <thead>
                   <tr>
                <th style={{width:"10px"}}>Transaction Time</th>
                <th>Student Details</th>
                <th>Amount</th>
                
                
              </tr>
                   </thead>
                   <tbody>
                   {Array.isArray(transactionList) && transactionList.map((item, key) => (
                        <tr key={key}>
                        <td>{item.created_at?.short_date}<br/><small>{item.created_at?.time}</small></td>
                        <td>{item.student}<br/><small>{item.school}</small></td>
                        <td><span  class="badge bg-teal"><i class="fa fa-circle text-teal fs-9px fa-fw me-5px" style={{color:"#042954"}}></i>UGX. {item.account==="ACCOUNT ACTIVATION"||item.account==="BUZZTIME LOAD"?item.cash_in:item.cash_out}</span><br/>
                        {item.status==="3"?<span class="badge badge-success">SUCCESSFUL</span>:
                        item.status==="1"?<span class="badge badge-warning">PENDING</span>:<span class="badge badge-danger">FAILED</span>}</td>
                        
                      </tr>
                      ))}
                      {transactionList === "404" && (<tr>
                          <td colSpan="4" style={{textAlign: "center"}}>
                            No recent transactions.
                          </td>
                        </tr>)}
                     
                   </tbody>
                 </table>
                 {loading && <Loader/>}
               </div>
             </div>
           </div>
                    
					  </div>
                    
          
          </div>
        
        
       
        
        
      </AppContainer>
    </div>
  );
}

export default Dashboard;
{/* <RenderSecure code="ADMIN-VIEW">
         
         <div className="col-lg-12">
           <div
             className="card custom-card"
             style={{marginTop: "25px", borderRadius: "10px"}}>
             <div className="card-body map-card">
               <div class="heading-layout1 mg-b-25">
                 <TableHeader
                   title="Recent Transactions"
                   subtitle="List of recent transactions"
                  
                 />
                 <div class="dropdown">
                   <a
                     class="dropdown-toggle"
                     href="#"
                     role="button"
                     data-toggle="dropdown"
                     aria-expanded="false">
                     ...
                   </a>

                   <div class="dropdown-menu dropdown-menu-right">
                     <Link class="dropdown-item" to={'/'}>
                       <i class="fa-solid fa-eye text-orange-peel"></i>
                       View All
                     </Link>
                   </div>
                 </div>
               </div>
               <div className="border-top mt-3"></div>
               <div className="table-responsive">
                 <table className="table table-hover text-nowrap mg-b-0">
                   <thead>
                   <tr>
               <th>Date </th>
               <th>Transaction ID</th>
               <th>Student Number</th>
               <th>Amount</th>
               <th>Status</th>
             </tr>
                   </thead>
                   <tbody>
                     
                     
                   </tbody>
                 </table>
               </div>
             </div>
           </div>
         </div>
       
       
    </RenderSecure> */}